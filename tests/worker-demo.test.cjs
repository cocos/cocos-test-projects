// Run: node --test tests/worker-demo.test.cjs (ENGINE_ROOT defaults to ../cocos4).
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { Worker } = require('node:worker_threads');
const ts = require(path.join(process.env.ENGINE_ROOT || path.resolve(__dirname, '../../cocos4'), 'node_modules/typescript'));
const root = path.resolve(__dirname, '..');
const scene = path.join(root, 'assets/cases/scene/worker-test');
const script = fs.readFileSync(path.join(root, 'workers/worker-test/spheres-worker.js'), 'utf8');
const source = fs.readFileSync(path.join(root, 'assets/cases/scene/worker-test/worker_test.ts'), 'utf8');
const compiled = ts.transpileModule(source + '\nexport { computeKernel, computeChunkKernel };', {
    compilerOptions: { target: ts.ScriptTarget.ES2017, module: ts.ModuleKind.CommonJS, experimentalDecorators: true },
}).outputText;
const executorSource = fs.readFileSync(path.join(root, 'assets/cases/scene/worker-test/worker-executor.ts'), 'utf8');
const executorCode = ts.transpileModule(executorSource, {
    compilerOptions: { target: ts.ScriptTarget.ES2017, module: ts.ModuleKind.CommonJS },
}).outputText;
function installExecutor(context) {
    const trace = {};
    const traceCode = ts.transpileModule(fs.readFileSync(path.join(root, 'assets/cases/scene/worker-test/worker-test-trace.ts'), 'utf8'), {
        compilerOptions: { target: ts.ScriptTarget.ES2017, module: ts.ModuleKind.CommonJS },
    }).outputText;
    vm.runInNewContext('(function(exports) {' + traceCode + '\n})', context)(trace);
    const executor = {};
    vm.runInNewContext('(function(exports, require) {' + executorCode + '\n})', context)(executor, context.require);
    const baseRequire = context.require;
    context.require = name => name.endsWith('worker-executor') ? executor : name.endsWith('worker-test-trace') ? trace : baseRequire(name);
    return { ...executor, ...trace };
}
const flush = async () => { for (let i = 0; i < 6; ++i) await Promise.resolve(); };
function load({ limit = 4, transfer = true, build = true, poolAvailable = true, rawFactory } = {}) {
    const loads = [];
    const logs = [];
    const rawHandles = [];
    const caps = { supportsStandardWorker: transfer && limit > 1, available: limit > 0, concurrencyLimit: limit, supportsTransfer: transfer, parallel: limit > 1 };
    class Pool {
        constructor(task, options) { this.task = task; this.options = options; this.recheck(); }
        recheck() { this.backend = caps.available ? 'worker' : 'sync'; this.concurrency = caps.available ? Math.min(limit, this.options.maxWorkers) : 1; return this.backend; }
        terminate() {}
    }
    const cc = {
        _decorator: { ccclass: () => C => C, property: (...args) => args.length >= 2 ? undefined : () => undefined },
        Component: class {}, Enum: x => x, WorkerPool: Pool,
        createWorker: rawFactory || (() => {
            const handle = { sent: [], stopped: 0,
                postMessage(message, transfers) { this.sent.push(structuredClone(message, { transfer: transfers || [] })); },
                onMessage(fn) { this.reply = fn; }, onError(fn) { this.fail = fn; },
                terminate() { this.stopped++; },
            };
            rawHandles.push(handle); return handle;
        }),
        getWorkerCapabilities: () => caps, getOptimalWorkerCount: () => 4,
        checkWorkerScript: () => ({ ready: caps.available, version: transfer ? 2 : 1, reason: '' }),
        TextAsset: class {}, resources: { load: (...args) => loads.push(args[2]) },
    };
    if (!poolAvailable) delete cc.WorkerPool;
    let blobCount = 0;
    const context = { exports: {}, require: name => name === 'cc' ? cc : { BUILD: build },
        console: { log: line => logs.push(line), warn() {} }, performance: { now: () => 1000 },
        Float32Array, ArrayBuffer, Array, Number, Promise, Blob, setTimeout, clearTimeout,
        URL: { createObjectURL: () => `blob:${++blobCount}`, revokeObjectURL() {} },
    };
    const executor = installExecutor(context);
    vm.runInNewContext(compiled, context);
    return { ...context.exports, ...executor, cc, rawHandles, loads, logs, blobCount: () => blobCount };
}
function data(d) {
    d.mode = 3; d.count = 2; d._pos = new Float32Array([1, 2, 3, 4, 5, 6]);
    d._vel = new Float32Array(6); d._prevPos = new Float32Array(6); d._lastDt = 0.016;
}

test('preview script is exactly the packaged script', () => {
    assert.equal(fs.readFileSync(path.join(root, 'assets/resources/workers/spheres-worker.txt'), 'utf8'), script);
});

test('PAL capacity caps demo chunks, and legacy serialized modes normalize to auto', async () => {
    for (const limit of [0, 1, Infinity]) {
        const { RandomSpheres } = load({ limit });
        const d = new RandomSpheres(); d.mode = 5; d._sendToWorkerMulti = () => {};
        d._ensurePool(); await flush();
        assert.equal(d.mode, 3);
        assert.equal(d._multiWorkerCount, limit === Infinity ? 4 : 1);
        assert.equal(d._pool.backend, limit === 0 ? 'sync' : 'worker');
    }
});

test('duplicate loads are suppressed and stale loads cannot clear a new initialization', async () => {
    const { RandomSpheres, loads, blobCount } = load({ build: false });
    const d = new RandomSpheres(); d.mode = 3; d._sendToWorkerMulti = () => {};
    d._ensurePool(); d._ensurePool(); assert.equal(loads.length, 1);
    d._destroyPool(); d._ensurePool(); assert.equal(loads.length, 2);
    loads[0](null, { text: script }); await flush();
    assert.equal(d._poolInitializing, true); assert.equal(blobCount(), 0);
    loads[1](null, { text: script }); await flush();
    assert.equal(d._poolInitializing, false); assert.equal(blobCount(), 1);
    assert.ok(d._pool);
});

test('destroying during a preview load creates no orphan Blob URL', async () => {
    const { RandomSpheres, loads, blobCount } = load({ build: false });
    const d = new RandomSpheres(); d.mode = 3;
    d._ensurePool(); d._destroyPool(); loads[0](null, { text: script }); await flush();
    assert.equal(blobCount(), 0); assert.equal(d._pool, null);
});

test('old task rejections cannot change a replacement pool or its busy flag', async () => {
    const { RandomSpheres } = load(); const d = new RandomSpheres(); data(d);
    let reject;
    d._pool = { backend: 'worker', concurrency: 1, terminate() {}, run: () => new Promise((_, r) => { reject = r; }) };
    d._sendToWorkerMulti(); d._destroyPool();
    const replacement = { backend: 'worker' }; d._pool = replacement; d._workerBusy = true;
    reject(new Error('disposed')); await flush();
    assert.equal(d.mode, 3); assert.equal(d._pool, replacement); assert.equal(d._workerBusy, true);
});

test('transfer only detaches copies; a failed batch leaves authoritative data intact', async () => {
    const { RandomSpheres } = load(); const d = new RandomSpheres(); data(d);
    const expected = Array.from(d._pos); const pending = [];
    d._multiWorkerCount = 2;
    d._pool = { backend: 'worker', concurrency: 2, terminate() {}, run(args, transfer) {
        structuredClone(args, { transfer });
        return new Promise((resolve, reject) => pending.push({ resolve, reject }));
    } };
    d._sendToWorkerMulti(); assert.deepEqual(Array.from(d._pos), expected);
    pending[0].reject(new Error('worker unavailable')); await flush();
    pending[1].resolve({ positions: new Float32Array(3), velocities: new Float32Array(3) }); await flush();
    assert.equal(d.mode, 0); assert.deepEqual(Array.from(d._pos), expected);
    assert.equal(d._pool, null);
});

test('V1 array and V2 typed-array message paths match the main-thread computation', () => {
    const { computeChunkKernel } = load();
    for (const arrays of [true, false]) {
        let onMessage; let reply; let transfer;
        vm.runInNewContext(script, { Float32Array, ArrayBuffer, Array, worker: {
            onMessage: fn => { onMessage = fn; }, postMessage: (m, t) => { reply = m; transfer = t; },
        } });
        const pos = new Float32Array([1, 2, 3, 4, 5, 6]); const vel = new Float32Array(6);
        const args = [arrays ? Array.from(pos) : pos, arrays ? Array.from(vel) : vel, 3, 5, 10, 0.016, 20];
        onMessage({ id: 7, args });
        const expected = computeChunkKernel(...args);
        assert.equal(reply.ok, true);
        assert.deepEqual(Array.from(reply.value.positions), Array.from(expected.positions));
        assert.deepEqual(Array.from(reply.value.velocities), Array.from(expected.velocities));
        assert.equal(Array.isArray(reply.value.positions), arrays);
        assert.equal(transfer?.length || 0, arrays ? 0 : 2);
    }
});

test('standalone script runs on a real worker thread with transferred data and matches whole-array computation', async () => {
    const { computeKernel } = load();
    const worker = new Worker(`const { parentPort } = require('node:worker_threads');
        global.self = { postMessage: (msg, transfer) => parentPort.postMessage(msg, transfer) };
        parentPort.on('message', data => self.onmessage({ data }));\n${script}`, { eval: true });
    try {
        const pos = new Float32Array([1, 2, 3, 4, 5, 6]); const vel = new Float32Array(6);
        const expected = computeKernel(pos.slice(), vel.slice(), 2, 10, 0.016, 20);
        const result = new Promise((resolve, reject) => { worker.once('message', resolve); worker.once('error', reject); });
        worker.postMessage({ id: 1, args: [pos, vel, 0, 2, 10, 0.016, 20] }, [pos.buffer, vel.buffer]);
        assert.equal(pos.byteLength, 0);
        const reply = await result;
        assert.equal(reply.ok, true);
        assert.deepEqual(Array.from(reply.value.positions), Array.from(expected.positions));
        assert.deepEqual(Array.from(reply.value.velocities), Array.from(expected.velocities));
    } finally { await worker.terminate(); }
});


test('an old successful task cannot overwrite the replacement batch', async () => {
    const { RandomSpheres } = load(); const d = new RandomSpheres(); data(d);
    let complete;
    d._pool = { backend: 'worker', concurrency: 1, terminate() {}, run: () => new Promise(resolve => { complete = resolve; }) };
    d._sendToWorkerMulti();
    complete({ positions: new Float32Array([99, 98, 97, 96, 95, 94]), velocities: new Float32Array(6) });
    d._destroyPool();
    const expected = Array.from(d._pos);
    d._pool = { backend: 'worker', concurrency: 1 }; d._workerBusy = true;
    await flush();
    assert.deepEqual(Array.from(d._pos), expected);
    assert.equal(d._workerBusy, true);
    assert.equal(d.mode, 3);
});

test('the mode button only toggles main thread and automatic Worker', () => {
    const { RandomSpheres } = load(); const d = new RandomSpheres(); d.mode = 0;
    d._onModeButtonClick(); assert.equal(d.mode, 3);
    d._onModeButtonClick(); assert.equal(d.mode, 0);
});

const os = require('node:os');
const { packageWorkers } = require('../extensions/worker-test-build/hooks.cjs');
for (const platform of ['web-desktop', 'web-mobile', 'wechatgame']) test('build hook packages physical workers for ' + platform, t => {
    const dest = fs.mkdtempSync(path.join(os.tmpdir(), 'worker-demo-build-'));
    t.after(() => fs.rmSync(dest, { recursive: true, force: true }));
    if (platform === 'wechatgame') fs.writeFileSync(path.join(dest, 'game.json'), JSON.stringify({ deviceOrientation: 'portrait', subpackages: [{ name: 'level' }] }));
    packageWorkers(root, dest, platform);
    for (const name of ['spheres-worker.js']) assert.equal(fs.readFileSync(path.join(dest, 'workers', name), 'utf8'), fs.readFileSync(path.join(root, 'workers/worker-test', name), 'utf8'));
    if (platform === 'wechatgame') {
        const game = JSON.parse(fs.readFileSync(path.join(dest, 'game.json')));
        assert.equal(game.workers, 'workers'); assert.equal(game.deviceOrientation, 'portrait'); assert.equal(game.subpackages[0].name, 'level');
    }
});

test('build hook refuses to replace an existing custom Worker directory', t => {
    const dest = fs.mkdtempSync(path.join(os.tmpdir(), 'worker-demo-build-'));
    t.after(() => fs.rmSync(dest, { recursive: true, force: true }));
    const file = path.join(dest, 'game.json'); fs.writeFileSync(file, '{"workers":"existing-workers"}');
    assert.throws(() => packageWorkers(root, dest, 'wechatgame'), /existing worker directory/);
    assert.equal(JSON.parse(fs.readFileSync(file)).workers, 'existing-workers');
});

test('project effective feature list enables Worker and Worker Pool', () => {
    const settings = JSON.parse(fs.readFileSync(path.join(root, 'settings/v2/packages/engine.json')));
    const config = settings.modules.configs[settings.modules.globalConfigKey];
    for (const feature of ['worker', 'worker-pool']) {
        assert.equal(config.cache[feature]._value, true);
        assert.ok(config.includeModules.includes(feature));
    }
});

test('automatic mode uses the actual engine and published PAL for V1, V2 and no-Worker hosts', async () => {
    const engine = process.env.ENGINE_ROOT || path.resolve(root, '../cocos4');
    for (const standard of [false, true, null, 'web', 'web-sim']) for (const management of [0, 1]) {
        const cache = new Map();
        const host = standard === null ? {} : {
            env: { isSupportStandardWorker: standard },
            createWorker() { return { postMessage() {}, onMessage() {}, onError() {}, terminate() {} }; },
            getFileSystemManager: () => ({ accessSync() {}, statSync: () => ({ size: 10 }) }),
        };
        const shared = { console: { log() {}, warn() {} }, setTimeout, clearTimeout,
            Float32Array, ArrayBuffer, SharedArrayBuffer, performance, Date, Set, Map };
        if (typeof standard === 'string') {
            shared.Worker = class Worker { postMessage() {} terminate() {} };
            shared.Blob = Blob;
            shared.URL = { createObjectURL: () => 'blob:test', revokeObjectURL() {} };
        }
        shared.globalThis = shared;
        const debug = { getError: id => String(id), warnID() {} };
        function moduleFile(file) {
            file = path.resolve(file);
            if (cache.has(file)) return cache.get(file).exports;
            const module = { exports: {} }; cache.set(file, module);
            const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
                compilerOptions: { target: ts.ScriptTarget.ES2017, module: ts.ModuleKind.CommonJS, experimentalDecorators: true, allowJs: true },
            }).outputText;
            const requireModule = spec => {
                if (spec === 'pal/minigame') return { minigame: host };
                if (spec === 'pal/worker') return moduleFile(path.join(engine, 'pal/worker', typeof standard === 'string' ? 'web/index.js' : 'minigame/index.js'));
                if (spec === '../core/platform/debug') return debug;
                if (spec === './worker') return moduleFile(path.join(engine, 'cocos/misc/worker.ts'));
                if (spec === 'cc/env') return { BUILD: true };
                if (spec === 'cc') return cc;
                const base = path.resolve(path.dirname(file), spec);
                const resolved = [base, base + '.ts', base + '.js'].find(p => fs.existsSync(p) && fs.statSync(p).isFile());
                if (!resolved) throw new Error('Cannot resolve ' + spec);
                return moduleFile(resolved);
            };
            vm.runInNewContext('(function(require, module, exports) {' + code + '\n})', shared, { filename: file })(requireModule, module, module.exports);
            return module.exports;
        }
        const api = moduleFile(path.join(engine, 'cocos/misc/worker.ts'));
        const poolApi = management === 0 ? moduleFile(path.join(engine, 'cocos/misc/worker-pool.ts')) : {};
        const cc = { ...api, ...poolApi, Component: class {}, Enum: x => x,
            _decorator: { ccclass: () => C => C, property: (...args) => args.length >= 2 ? undefined : () => undefined } };
        const { RandomSpheres } = moduleFile(path.join(root, 'assets/cases/scene/worker-test/worker_test.ts'));
        const d = new RandomSpheres(); d.workerManagement = management; d.mode = 3; d.maxWorkers = 4; d.simulateNoWorker = standard === 'web-sim'; d._sendToWorkerMulti = () => {};
        try {
            d._ensurePool(); await flush();
            assert.equal(d.mode, 3);
            assert.equal(d._pool.backend, standard === null || standard === 'web-sim' ? 'sync' : 'worker');
            assert.equal(d._pool.concurrency, standard === true || standard === 'web' ? 4 : 1);
            if (typeof standard === 'string') {
                assert.equal(typeof shared.Worker, 'function'); assert.equal(shared.Blob, Blob);
                assert.equal(d._noWorkerSimVerified, standard === 'web-sim');
            }
            assert.equal(api.getWorkerCapabilities().supportsStandardWorker, standard === true);
            if (management === 1) assert.equal(cache.has(path.join(engine, 'cocos/misc/worker-pool.ts')), false);
        } finally { d._destroyPool(); }
    }
});

for (const limit of [0, 1, Infinity]) test('direct mode needs no pool feature and respects PAL limit ' + limit, async () => {
    const env = load({ limit, poolAvailable: false });
    Object.defineProperty(env.cc, 'WorkerPool', { get() { throw new Error('direct mode must not read WorkerPool'); } });
    const d = new env.RandomSpheres(); d.mode = 3; d.workerManagement = 1; d._sendToWorkerMulti = () => {};
    try {
        d._ensurePool(); await flush();
        assert.equal(d.mode, 3);
        assert.equal(d._pool.backend, limit === 0 ? 'sync' : 'worker');
        assert.equal(d._pool.concurrency, limit === Infinity ? 4 : 1);
        assert.equal(env.rawHandles.length, limit === 0 ? 0 : limit === Infinity ? 4 : 1);
    } finally { d._destroyPool(); }
    assert.ok(env.rawHandles.every(handle => handle.stopped === 1));
});

test('pool mode without its feature gives an actionable failure and returns to main thread', async () => {
    const env = load({ poolAvailable: false }); const d = new env.RandomSpheres(); d.mode = 3;
    d._ensurePool(); await flush();
    assert.equal(d.mode, 0); assert.equal(d._pool, null); assert.equal(env.rawHandles.length, 0);
});

test('changing the Inspector management option retires old tasks and creates the other executor', async () => {
    const env = load(); const d = new env.RandomSpheres(); data(d);
    d.workerManagement = 1; d._lastWorkerManagement = 1; d._lastMode = 3; d.maxWorkers = 1;
    d._ensurePool(); await flush();
    const expected = Array.from(d._pos); const raw = env.rawHandles[0];
    assert.ok(raw.sent.length); const stale = raw.sent[0];
    d.workerManagement = 0; d._sendToWorkerMulti = () => {}; d._syncMode(); await flush();
    assert.equal(raw.stopped, 1); assert.equal(d._pool instanceof env.DirectWorkerExecutor, false);
    raw.reply({ id: stale.id, ok: true, value: { positions: new Float32Array(6).fill(99), velocities: new Float32Array(6) } });
    await flush(); assert.deepEqual(Array.from(d._pos), expected); assert.equal(d.mode, 3);
    const oldPool = d._pool;
    d.workerManagement = 1; d._syncMode(); await flush();
    assert.notEqual(d._pool, oldPool); assert.ok(d._pool instanceof env.DirectWorkerExecutor);
    d._destroyPool();
});

test('direct Worker failure after transfer preserves authoritative sphere data and never replays', async () => {
    const env = load({ poolAvailable: false }); const d = new env.RandomSpheres(); data(d);
    const expected = Array.from(d._pos); d.workerManagement = 1; d.maxWorkers = 2;
    d._ensurePool(); await flush();
    assert.equal(env.rawHandles.length, 2); assert.deepEqual(Array.from(d._pos), expected);
    env.rawHandles[0].fail(new Error('raw worker failed')); await flush();
    assert.equal(d.mode, 0); assert.equal(d._pool, null); assert.deepEqual(Array.from(d._pos), expected);
    assert.ok(env.rawHandles.every(handle => handle.stopped === 1));
});

test('direct executor rejects excess requests, correlates replies, and reuses a worker after task errors', async () => {
    const env = load({ poolAvailable: false });
    const client = new env.DirectWorkerExecutor('task.js', { maxWorkers: 1, timeout: 0 });
    try {
        const first = client.run([3]); const raw = env.rawHandles[0];
        await assert.rejects(client.run([4]), /does not queue/);
        raw.reply({ id: raw.sent[0].id + 10, ok: true, value: 99 });
        raw.reply({ id: raw.sent[0].id, ok: true, value: 6 });
        assert.equal(await first, 6);
        const failed = assert.rejects(client.run([4]), /bad computation/);
        raw.reply({ id: raw.sent[1].id, ok: false, error: 'bad computation' }); await failed;
        const next = client.run([5]); raw.reply({ id: raw.sent[2].id, ok: true, value: 10 });
        assert.equal(await next, 10); assert.equal(env.rawHandles.length, 1);
    } finally { client.terminate(); }
    await assert.rejects(client.run(), /terminated/);
});

test('direct timeout rejects all in-flight tasks once, terminates all workers and does not retry fallback', async () => {
    const env = load({ poolAvailable: false }); let retries = 0, settled = 0;
    const client = new env.DirectWorkerExecutor('task.js', { maxWorkers: 2, timeout: 10, fallback: () => retries++ });
    const tasks = [client.run([3]), client.run([4])].map(p => assert.rejects(p.finally(() => settled++), /timed out/));
    await Promise.all(tasks); client.terminate();
    assert.equal(settled, 2); assert.equal(retries, 0); assert.ok(env.rawHandles.every(handle => handle.stopped === 1));
});

test('partial direct Worker creation failure cleans up and safely falls back before sending anything', async () => {
    let calls = 0, stopped = 0, sent = 0;
    const env = load({ rawFactory() {
        if (++calls === 2) throw new Error('worker quota');
        return { onMessage() {}, onError() {}, postMessage() { sent++; }, terminate() { stopped++; } };
    } });
    const client = new env.DirectWorkerExecutor('task.js', { maxWorkers: 2, fallback: n => n * 2 });
    try {
        assert.equal(client.backend, 'sync'); assert.equal(await client.run([21]), 42);
        assert.equal(stopped, 1); assert.equal(sent, 0);
    } finally { client.terminate(); }
});

test('malformed direct replies reject pending work and dispose the executor', async () => {
    const env = load(); const client = new env.DirectWorkerExecutor('task.js', { maxWorkers: 1, timeout: 0 });
    const pending = assert.rejects(client.run(), /Invalid direct Worker response/);
    env.rawHandles[0].reply({}); await pending;
    assert.equal(client.backend, 'none'); assert.equal(env.rawHandles[0].stopped, 1);
});

test('direct mode completes a sphere batch on real Node Worker threads with only the basic feature', async t => {
    const threads = [];
    const env = load({ poolAvailable: false, rawFactory() {
        const thread = new Worker(`const { parentPort } = require('node:worker_threads');
            global.self = { postMessage: (msg, transfer) => parentPort.postMessage(msg, transfer) };
            parentPort.on('message', data => self.onmessage({ data }));\n${script}`, { eval: true });
        threads.push(thread);
        return { postMessage: (message, transfer) => thread.postMessage(message, transfer),
            onMessage: listener => thread.on('message', listener), onError: listener => thread.on('error', listener),
            terminate: () => { void thread.terminate(); } };
    } });
    const d = new env.RandomSpheres(); data(d); d.workerManagement = 1; d.maxWorkers = 2; d.mathIterations = 5;
    t.after(async () => { d._destroyPool(); await Promise.all(threads.map(thread => thread.terminate())); });
    const expected = env.computeKernel(d._pos.slice(), d._vel.slice(), d.count, d.mathIterations, d._lastDt, d.bounds);
    const finished = new Promise(resolve => {
        const merge = d._mergeMultiResults.bind(d); d._mergeMultiResults = () => { merge(); resolve(); };
    });
    d._ensurePool();
    let timer;
    try { await Promise.race([finished, new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('real worker batch timeout')), 3000); })]); }
    finally { clearTimeout(timer); }
    assert.equal(d._pool.backend, 'worker'); assert.equal(threads.length, 2);
    assert.deepEqual(Array.from(d._pos), Array.from(expected.positions));
    assert.deepEqual(Array.from(d._vel), Array.from(expected.velocities));
});

test('shared execution adapter bundles against a basic-only cc module with no missing pool export', async () => {
    const engine = process.env.ENGINE_ROOT || path.resolve(root, '../cocos4');
    const { Bundler } = require(path.join(engine, 'node_modules/@cocos/ccbuild'));
    const esm = ts.transpileModule(executorSource, { compilerOptions: { target: ts.ScriptTarget.ES2017, module: ts.ModuleKind.ESNext } }).outputText;
    const warnings = [];
    const bundle = await Bundler.rollup.core.rollup({ input: 'demo-executor', onwarn: warning => warnings.push(warning),
        plugins: [{ name: 'basic-worker-only', resolveId: id => ['demo-executor', 'cc'].includes(id) ? id : null,
            load: id => id === 'demo-executor' ? esm : id === 'cc' ? `
                export function createWorker() { return {postMessage(){}, onMessage(){}, onError(){}, terminate(){}}; }
                export function getWorkerCapabilities() { return {available:true, concurrencyLimit:1, supportsFunctionWorker:true}; }
                export function checkWorkerScript() { return {ready:true}; }
            ` : null }] });
    try {
        const { output } = await bundle.generate({ format: 'cjs' });
        assert.deepEqual(warnings, []);
        const context = { exports: {}, console, setTimeout, clearTimeout };
        vm.runInNewContext(output[0].code, context);
        const client = context.exports.createDemoExecutor('task.js', { maxWorkers: 1 }, 1);
        assert.equal(client.backend, 'worker'); client.terminate();
        assert.throws(() => context.exports.createDemoExecutor('task.js', { maxWorkers: 1 }, 0), /worker-pool feature/);
    } finally { await bundle.close(); }
});

test('structured checkpoints report validated results and bounded diagnostic fields', async () => {
    const env = load(); const d = new env.RandomSpheres(); data(d);
    d._pool = { backend: 'worker', concurrency: 2, terminate() {},
        run: args => Promise.resolve(env.computeChunkKernel(...args)) };
    d._multiWorkerCount = 2;
    d._sendToWorkerMulti(); await flush();
    const snapshot = d.getTestSnapshot();
    assert.equal(snapshot.completedBatches, 1); assert.equal(snapshot.validatedBatches, 1);
    assert.equal(snapshot.validationFailures, 0); assert.equal(snapshot.busy, false);
    assert.equal(typeof snapshot.runId, 'string'); assert.equal(Number.isFinite(snapshot.lastRoundTripMs), true);
    const entries = env.logs.filter(line => line.startsWith('[worker-test] ')).map(line => JSON.parse(line.slice(14)));
    assert.deepEqual(entries.map(e => e.event), ['validation-pass', 'first-batch']);
    assert.ok(entries.every(e => e.testcase === 'worker-test' && e.runId === snapshot.runId));
    assert.ok(entries[1].sequence > entries[0].sequence);
    d._destroyPool();
});

for (const invalid of ['mismatch', 'bad-length', 'nan']) test('validation rejects ' + invalid + ' before any partial state is merged', async () => {
    const env = load(); const d = new env.RandomSpheres(); data(d);
    const before = Array.from(d._pos); let chunk = 0;
    d._pool = { backend: 'worker', concurrency: 2, terminate() {}, run: args => {
        const value = env.computeChunkKernel(...args);
        if (++chunk === 2) {
            if (invalid === 'mismatch') value.positions[0] += 1;
            if (invalid === 'bad-length') value.positions = new Float32Array(0);
            if (invalid === 'nan') value.positions[0] = NaN;
        }
        return Promise.resolve(value);
    } };
    d._multiWorkerCount = 2; d._sendToWorkerMulti(); await flush();
    assert.equal(d.mode, 0); assert.deepEqual(Array.from(d._pos), before);
    const snapshot = d.getTestSnapshot(); assert.equal(snapshot.validationFailures, 1);
    assert.equal(snapshot.completedBatches, 0); assert.ok(snapshot.lastError);
    const text = env.logs.join('\n'); assert.match(text, /validation-failed/); assert.match(text, /fallback/);
});

test('disabled telemetry and zero reference interval keep computation functional', async () => {
    const env = load(); const d = new env.RandomSpheres(); data(d);
    d.telemetryEnabled = false; d.validationEveryBatches = 0;
    d._pool = { backend: 'sync', concurrency: 1, terminate() {}, run: args => Promise.resolve(env.computeChunkKernel(...args)) };
    d._sendToWorkerMulti(); await flush();
    assert.equal(d.getTestSnapshot().completedBatches, 1); assert.equal(d.getTestSnapshot().validatedBatches, 0);
    assert.equal(env.logs.some(line => line.startsWith('[worker-test] ')), false);
    d._destroyPool();
});

test('scene references stay stable and expose both management modes without version switches', () => {
    const meta = JSON.parse(fs.readFileSync(path.join(scene, 'worker_test.ts.meta')));
    assert.equal(meta.uuid, 'b7e2ed68-9588-4767-89d2-2b5618f46665');
    const objects = JSON.parse(fs.readFileSync(path.join(scene, 'worker.scene')));
    const component = objects.find(item => item.__type__ === 'b7e2e1olYhHZ4nSK1YY9GZl');
    assert.equal(component.mode, 3); assert.equal(component.workerManagement, 0); assert.equal(component.maxWorkers, 4);
    assert.equal(component.telemetryEnabled, true); assert.equal(component.count, 300);
    const automation = fs.readFileSync(path.join(root, 'assets/auto-test-case/staticScene/worker.test.ts'), 'utf8');
    assert.match(automation, /@runScene\('worker'\)/); assert.match(automation, /@testClass\('WorkerTestcase'\)/);
});

test('transparent pool recovery emits a backend transition without reporting a computation failure', async () => {
    const env = load(); const d = new env.RandomSpheres(); data(d);
    const executor = { backend: 'worker', concurrency: 1, terminate() {}, run: args => {
        executor.backend = 'sync'; return Promise.resolve(env.computeChunkKernel(...args));
    } };
    d._pool = executor; d._observeBackend(); d._sendToWorkerMulti(); await flush();
    const snapshot = d.getTestSnapshot();
    assert.equal(snapshot.backend, 'sync'); assert.equal(snapshot.validatedBatches, 1); assert.equal(snapshot.lastError, '');
    const events = env.logs.filter(line => line.startsWith('[worker-test] ')).map(line => JSON.parse(line.slice(14)));
    const change = events.find(e => e.event === 'backend-change');
    assert.equal(change.previousBackend, 'worker'); assert.equal(change.recoveredSynchronously, true);
    d._destroyPool();
});

test('User Timing marks are bounded and cleaned up when the trace is disposed', () => {
    const source = fs.readFileSync(path.join(scene, 'worker-test-trace.ts'), 'utf8');
    const code = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2017, module: ts.ModuleKind.CommonJS } }).outputText;
    const marks = new Set(), lines = [];
    const context = { exports: {}, console: { log: line => lines.push(line) },
        performance: { mark: name => marks.add(name), clearMarks: name => marks.delete(name) } };
    vm.runInNewContext(code, context);
    const trace = new context.exports.WorkerTestTrace();
    trace.emit('sample', { backend: 'worker' }); trace.emit('sample', { backend: 'sync' });
    assert.equal(marks.size, 1); trace.dispose(); assert.equal(marks.size, 0);
    assert.equal(lines.length, 2); assert.equal(JSON.parse(lines[1].slice(14)).sequence, 2);
});

test('each replacement executor validates and marks its own first batch', async () => {
    const env = load(); const d = new env.RandomSpheres(); data(d);
    for (let i = 0; i < 2; i++) {
        d._pool = { backend: 'worker', concurrency: 1, terminate() {}, run: args => Promise.resolve(env.computeChunkKernel(...args)) };
        d._sendToWorkerMulti(); await flush(); d._destroyPool();
    }
    assert.equal(d.getTestSnapshot().validatedBatches, 2);
    const entries = env.logs.filter(line => line.startsWith('[worker-test] ')).map(line => JSON.parse(line.slice(14)));
    const first = entries.filter(entry => entry.event === 'first-batch');
    assert.equal(first.length, 2); assert.notEqual(first[0].generation, first[1].generation);
});

test('testcase and automation sources type-check against the selected engine declarations', () => {
    const engine = process.env.ENGINE_ROOT || path.resolve(root, '../cocos4');
    const declaration = path.join(engine, 'bin/.declarations/cc.d.ts');
    assert.ok(fs.existsSync(declaration), 'Build the selected engine declarations before running Worker testcase tests.');
    const virtualEnv = path.join(root, 'tests/__worker_env__.d.ts');
    const files = ['worker_test.ts', 'worker-executor.ts', 'worker-test-trace.ts'].map(name => path.join(scene, name));
    files.push(path.join(root, 'assets/auto-test-case/staticScene/worker.test.ts'), declaration, virtualEnv);
    const options = { target: ts.ScriptTarget.ES2017, module: ts.ModuleKind.ESNext, experimentalDecorators: true,
        strict: true, skipLibCheck: true, noEmit: true, moduleResolution: ts.ModuleResolutionKind.NodeJs, types: [] };
    const host = ts.createCompilerHost(options), getSourceFile = host.getSourceFile.bind(host);
    host.getSourceFile = (file, languageVersion, onError, shouldCreateNewSourceFile) => file === virtualEnv
        ? ts.createSourceFile(file, "declare module 'cc/env' { export const BUILD: boolean; }", languageVersion)
        : getSourceFile(file, languageVersion, onError, shouldCreateNewSourceFile);
    const program = ts.createProgram(files, options, host);
    const diagnostics = ts.getPreEmitDiagnostics(program);
    assert.equal(diagnostics.length, 0, ts.formatDiagnosticsWithColorAndContext(diagnostics, {
        getCurrentDirectory: () => root, getCanonicalFileName: name => name, getNewLine: () => '\n',
    }));
});
