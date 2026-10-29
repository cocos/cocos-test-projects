/**
 * Worker testcase：比较主线程计算、WorkerPool 与直接 Worker。
 *
 * 按钮切换「单线程 / Worker（自动）」；Inspector 另外保留函数和脚本模式供调试。
 * Inspector 的「Worker 管理方式」选择 WorkerPool / 直接 Worker。
 * 自动模式请求 maxWorkers 个 Worker，PAL 根据平台能力封顶：微信 V1 至多 1 个，
 * 获得 V2 灰度资格才支持多个。模式选择不会开启灰度，也不会强制指定 V1/V2。
 * HUD 展示管理方式、实际后端和并发上限；降级为 sync 时明确显示主线程同步执行。
 * Worker 只负责球体运动计算，节点更新与渲染仍在主线程。
 *
 * 使用 项目场景 或把组件挂到场景节点：
 * - Web 构建：将 workers/spheres-worker.js 复制到构建根目录的 workers/ 下。
 * - 微信构建：复制同一脚本，并在 game.json 配置 { "workers": "workers" }。
 * - 浏览器预览：自动读取 resources/workers/spheres-worker.txt 转成 Blob URL。
 * 修改独立 JS 后需要同步更新该 TextAsset。
 * simulateNoWorker 仅对当前组件模拟 Web 无 Worker，不修改全局对象或小游戏平台能力；
 * 是否成功降级以执行器的实际 backend 为准。
 */

import {
    _decorator,
    builtinResMgr,
    Button,
    Camera,
    Canvas,
    Color,
    Component,
    director,
    Director,
    Enum,
    Label,
    Layers,
    Material,
    Mesh,
    MeshRenderer,
    Node,
    primitives,
    resources,
    Sprite,
    SpriteFrame,
    TextAsset,
    UITransform,
    utils,
    Vec3,
    getOptimalWorkerCount,
    getWorkerCapabilities,
    checkWorkerScript,
} from 'cc';
import type { WorkerTask } from 'cc';
import { WorkerManagement, createDemoExecutor } from './worker-executor';
import type { IWorkerExecutor } from './worker-executor';
import { BUILD } from 'cc/env';
import { WorkerTestTrace } from './worker-test-trace';

const { ccclass, property } = _decorator;

enum ComputeMode {
    /** 单线程：重计算在主线程 update 里跑。 */
    MAIN_THREAD = 0,
    /** 多线程内嵌函数：WorkerPool 函数模式，worker 代码由 computeChunkKernel.toString() 生成。 */
    WORKER_INLINE = 1,
    /** 多线程独立JS：WorkerPool 脚本模式，worker 代码在单独的 .js 文件里。 */
    WORKER_SCRIPT = 2,
    /** 平台 Worker 自动适配：脚本模式，实际能力由 PAL 检测。保留旧自动模式的序列化值 3。 */
    WORKER_AUTO = 3,
}
const ComputeModeEnum = Enum(ComputeMode);
const WorkerManagementEnum = Enum({ WorkerPool: WorkerManagement.WORKER_POOL, '直接 Worker': WorkerManagement.DIRECT_WORKER });

/** 按钮循环切换的模式顺序：单线程 → Worker（自动）。 */
const MODE_CYCLE = [ComputeMode.MAIN_THREAD, ComputeMode.WORKER_AUTO];

/** 模式的中文显示名（用于按钮 / HUD）。 */
function modeDisplayName (m: ComputeMode): string {
    switch (m) {
    case ComputeMode.MAIN_THREAD: return '单线程';
    case ComputeMode.WORKER_INLINE: return '内嵌函数';
    case ComputeMode.WORKER_SCRIPT: return '独立JS';
    case ComputeMode.WORKER_AUTO: return 'Worker（自动）';
    default: return '未知';
    }
}

/**
 * 独立 worker 脚本路径（相对游戏根目录），构建后（BUILD=true）使用。
 * - 微信：需把该文件放进构建产物的 workers/ 目录，并在 game.json 声明 { "workers": "workers" }。
 * - Web ：需保证该文件能以这个路径被访问到（拷进构建产物同名目录）。
 */
const WORKER_SCRIPT_PATH = 'workers/spheres-worker.js';

/**
 * 预览环境专用：worker 脚本原文以 TextAsset 形式放在 assets/resources/workers/spheres-worker.txt。
 * Creator 预览服务器只伺服编译产物（/assets、/scripting 等 bundle），项目根 workers/ 原始文件是 404，
 * new Worker(path) 会直接 onerror。因此预览下运行时读出 TextAsset 文本转同源 blob URL 再交给 WorkerPool。
 * 注意：两份文件内容必须保持一致（源头是 workers/worker-test/spheres-worker.js）。
 */
const WORKER_TEXT_ASSET = 'workers/spheres-worker';

/** Worker 计算返回：新的位置 / 速度缓冲区。 */
interface IComputeResult {
    positions: Float32Array;
    velocities: Float32Array;
}

/** 分块计算返回：只覆盖 [start, end) 区间的球。 */
interface IChunkResult {
    positions: Float32Array;
    velocities: Float32Array;
}

/**
 * 重计算内核（整块、原地）：纯函数、无闭包依赖。主线程单线程模式直接调用。
 */
function computeKernel (
    pos: Float32Array,
    vel: Float32Array,
    count: number,
    mathIter: number,
    dt: number,
    bounds: number,
): IComputeResult {
    const forceScale = 2.0;
    const maxSp = 12;
    for (let i = 0; i < count; i++) {
        const ix = i * 3;
        let x = pos[ix];
        let y = pos[ix + 1];
        let z = pos[ix + 2];
        let vx = vel[ix];
        let vy = vel[ix + 1];
        let vz = vel[ix + 2];

        // 重负载：向量场扰动模拟（每球独立，天然可并行）
        let ax = 0;
        let ay = 0;
        let az = 0;
        for (let k = 0; k < mathIter; k++) {
            const t = k * 0.37 + i * 0.01;
            ax += Math.sin(y * 0.5 + t) * Math.cos(z * 0.3 + t * 0.7);
            ay += Math.sin(z * 0.5 + t * 1.1) * Math.cos(x * 0.3 + t);
            az += Math.sin(x * 0.5 + t * 0.9) * Math.cos(y * 0.3 + t * 1.3);
        }
        vx += ax * dt * forceScale;
        vy += ay * dt * forceScale;
        vz += az * dt * forceScale;

        const sp2 = vx * vx + vy * vy + vz * vz;
        if (sp2 > maxSp * maxSp) {
            const inv = maxSp / Math.sqrt(sp2);
            vx *= inv; vy *= inv; vz *= inv;
        }

        x += vx * dt; y += vy * dt; z += vz * dt;

        if (x > bounds) { x = bounds; vx = -Math.abs(vx); }
        else if (x < -bounds) { x = -bounds; vx = Math.abs(vx); }
        if (y > bounds) { y = bounds; vy = -Math.abs(vy); }
        else if (y < -bounds) { y = -bounds; vy = Math.abs(vy); }
        if (z > bounds) { z = bounds; vz = -Math.abs(vz); }
        else if (z < -bounds) { z = -bounds; vz = Math.abs(vz); }

        pos[ix] = x; pos[ix + 1] = y; pos[ix + 2] = z;
        vel[ix] = vx; vel[ix + 1] = vy; vel[ix + 2] = vz;
    }
    return { positions: pos, velocities: vel };
}

/**
 * 分块重计算内核：与 computeKernel 完全相同的数学，但只处理球下标区间 [start, end)。
 * 每个 Worker 各自算一块，互不重叠，天然可并行。入参是「全量缓冲区 + 区间」，
 * 返回「仅含该区间的子缓冲区」，便于主线程按区间回填。
 *
 * 注意：为保持与 computeKernel 逐球结果完全一致（可验证），这里的扰动项 t 用「全局下标 i」，
 * 而不是块内下标 —— 否则分块与整块算出的结果会不同。
 *
 * 三种 worker 模式共用这份数学：
 *   - 内嵌函数模式：本函数 toString() 后在 worker 里重建执行；
 *   - 独立JS / 微信模式：workers/spheres-worker.js 里的 runTask 是它的等价拷贝。
 */
function computeChunkKernel (
    pos: Float32Array,
    vel: Float32Array,
    start: number,
    end: number,
    mathIter: number,
    dt: number,
    bounds: number,
): IChunkResult {
    const forceScale = 2.0;
    const maxSp = 12;
    const len = end - start;
    const outPos = new Float32Array(len * 3);
    const outVel = new Float32Array(len * 3);

    for (let i = start; i < end; i++) {
        const ix = (i - start) * 3;   // 输入为本区间切片，按局部下标读取（Fix4：每块只传切片）
        let x = pos[ix];
        let y = pos[ix + 1];
        let z = pos[ix + 2];
        let vx = vel[ix];
        let vy = vel[ix + 1];
        let vz = vel[ix + 2];

        let ax = 0;
        let ay = 0;
        let az = 0;
        for (let k = 0; k < mathIter; k++) {
            const t = k * 0.37 + i * 0.01;   // 用全局下标 i，保证与整块结果一致
            ax += Math.sin(y * 0.5 + t) * Math.cos(z * 0.3 + t * 0.7);
            ay += Math.sin(z * 0.5 + t * 1.1) * Math.cos(x * 0.3 + t);
            az += Math.sin(x * 0.5 + t * 0.9) * Math.cos(y * 0.3 + t * 1.3);
        }
        vx += ax * dt * forceScale;
        vy += ay * dt * forceScale;
        vz += az * dt * forceScale;

        const sp2 = vx * vx + vy * vy + vz * vz;
        if (sp2 > maxSp * maxSp) {
            const inv = maxSp / Math.sqrt(sp2);
            vx *= inv; vy *= inv; vz *= inv;
        }

        x += vx * dt; y += vy * dt; z += vz * dt;

        if (x > bounds) { x = bounds; vx = -Math.abs(vx); }
        else if (x < -bounds) { x = -bounds; vx = Math.abs(vx); }
        if (y > bounds) { y = bounds; vy = -Math.abs(vy); }
        else if (y < -bounds) { y = -bounds; vy = Math.abs(vy); }
        if (z > bounds) { z = bounds; vz = -Math.abs(vz); }
        else if (z < -bounds) { z = -bounds; vz = Math.abs(vz); }

        const o = (i - start) * 3;
        outPos[o] = x; outPos[o + 1] = y; outPos[o + 2] = z;
        outVel[o] = vx; outVel[o + 1] = vy; outVel[o + 2] = vz;
    }
    return { positions: outPos, velocities: outVel };
}

export interface IWorkerCaseSnapshot {
    runId: string;
    management: 'pool' | 'direct';
    mode: 'main' | 'worker';
    backend: string;
    concurrency: number;
    generation: number;
    busy: boolean;
    initializing: boolean;
    count: number;
    mathIterations: number;
    completedBatches: number;
    validatedBatches: number;
    validationFailures: number;
    lastRoundTripMs: number;
    validationCpuMs: number;
    lastError: string;
}

@ccclass('RandomSpheres')
export class RandomSpheres extends Component {

    /** 自动模式请求的 Worker 数量；引擎会按平台能力封顶，不用于选择微信版本。 */
    @property({ min: 1, step: 1 })
    public maxWorkers = 4;

    /** 线程管理方式；微信 V1/V2 能力仍由 PAL 自动识别。 */
    @property({ type: WorkerManagementEnum, displayName: 'Worker 管理方式', tooltip: 'WorkerPool 使用引擎调度；直接 Worker 由 Demo 自行创建和管理 Worker。' })
    public workerManagement = WorkerManagement.WORKER_POOL;

    /** 球体数量。 */
    @property
    public count = 300;

    /** 计算模式：0=单线程 1=多线程内嵌函数 2=多线程独立JS 3=Worker自动适配。 */
    @property({ type: ComputeModeEnum })
    public mode = ComputeMode.MAIN_THREAD;

    /** 仅对本组件模拟 Web 无 Worker，不修改全局或小游戏平台能力。 */
    @property
    public simulateNoWorker: boolean = false;

    /** 每球每帧的重计算迭代次数（计算量大小的旋钮，调它找 Worker 临界点）。 */
    @property
    public mathIterations = 200;

    @property
    public radius = 0.3;

    /** 运动空间半边长。 */
    @property
    public bounds = 15;

    @property
    public speed = 6;

    /** 校验第一批及每 N 批结果；0 关闭参考计算。校验会增加主线程开销。 */
    @property({ min: 0, step: 1, tooltip: '0 关闭；启用时第一批及每 N 批与主线程参考计算比较。性能压测时设为 0。' })
    public validationEveryBatches = 120;

    @property
    public telemetryEnabled = true;

    /** 周期性统计日志的间隔，生命周期和校验事件不受此间隔影响。 */
    @property({ min: 1 })
    public telemetryIntervalSeconds = 5;

    private _trace = new WorkerTestTrace();
    private _completedBatches = 0;
    private _validatedBatches = 0;
    private _lastVerifiedGeneration = -1;
    private _firstCompletedGeneration = -1;
    private _validationFailures = 0;
    private _lastRoundTripMs = 0;
    private _validationCpuMs = 0;
    private _batchStarted = 0;
    private _expectedBatch: IComputeResult | null = null;
    private _lastSampleAt = 0;
    private _lastError = '';
    private _observedBackend = '';

    /** Public acceptance state; capability availability alone is not proof that a Worker ran. */
    public getTestSnapshot (): IWorkerCaseSnapshot {
        return {
            runId: this._trace.runId,
            management: this.workerManagement === WorkerManagement.DIRECT_WORKER ? 'direct' : 'pool',
            mode: this.mode === ComputeMode.MAIN_THREAD ? 'main' : 'worker',
            backend: this.mode === ComputeMode.MAIN_THREAD ? 'main' : this._pool?.backend || 'initializing',
            concurrency: this._pool?.concurrency || 0,
            generation: this._poolGen, busy: this._workerBusy, initializing: this._poolInitializing,
            count: this.count, mathIterations: this.mathIterations,
            completedBatches: this._completedBatches, validatedBatches: this._validatedBatches,
            validationFailures: this._validationFailures, lastRoundTripMs: this._lastRoundTripMs,
            validationCpuMs: this._validationCpuMs, lastError: this._lastError,
        };
    }

    /** Used by the repository automation suite; settings remain available in the Inspector. */
    public configureTest (options: {
        management: 'pool' | 'direct'; mode: 'main' | 'worker';
        count?: number; mathIterations?: number; simulateNoWorker?: boolean;
    }): void {
        this._destroyPool();
        this.workerManagement = options.management === 'direct' ? WorkerManagement.DIRECT_WORKER : WorkerManagement.WORKER_POOL;
        this.mode = options.mode === 'main' ? ComputeMode.MAIN_THREAD : ComputeMode.WORKER_AUTO;
        this._lastMode = this.mode;
        this._lastWorkerManagement = this.workerManagement;
        this.mathIterations = options.mathIterations ?? 4;
        this.simulateNoWorker = options.simulateNoWorker ?? false;
        this.validationEveryBatches = 1;
        this._completedBatches = this._validatedBatches = this._validationFailures = 0;
        this._lastRoundTripMs = this._validationCpuMs = 0;
        this._lastError = '';
        this.rebuild(options.count ?? 8);
        this._emitTrace('configured');
    }

    private _emitTrace (event: string, extra: object = {}): void {
        if (!this.telemetryEnabled) return;
        this._trace.emit(event, { ...this.getTestSnapshot(), ...extra });
    }

    private _observeBackend (): void {
        const backend = this._pool?.backend;
        if (!backend) return;
        const previous = this._observedBackend;
        this._observedBackend = backend;
        if (previous && previous !== backend) {
            this._emitTrace('backend-change', { previousBackend: previous, recoveredSynchronously: backend === 'sync' });
        }
    }

    // ---------------- 内部状态 ----------------

    private _nodes: Node[] = [];
    private _mesh: Mesh | null = null;
    private _host: Node | null = null;
    private _createdCamera: Node | null = null;

    private _pos = new Float32Array(0);
    private _vel = new Float32Array(0);
    private _hasPending = false;

    // ---- 渲染插值（解耦渲染帧率与模拟更新率）----
    // worker 模式下权威位置只在 worker 结果回传时更新（微信 V1 上约 7~15Hz），而渲染是 60fps。
    // 若只在回传帧 setPosition，中间帧画面冻结 → "FPS 高却顿挫"。这里保存上一批权威位置 _prevPos，
    // 每渲染帧在 _prevPos→_pos 之间按时间插值，把内容更新率平滑回 60fps 视觉连续。
    private _prevPos = new Float32Array(0);
    private _lastResultTime = 0;   // 上次权威结果到齐时刻（performance.now）
    private _simInterval = 0;      // 结果到齐间隔 EMA（ms），插值 alpha 的分母
    // ---- HUD：暴露渲染/模拟解耦 ----
    private _renderFps = 60;           // 真实渲染帧率（帧间隔 dt 的 EMA）
    private _simSteps = 0;             // 累计权威结果回传次数（模拟步）
    private _simStepsAtLastHud = 0;    // 上次 HUD 刷新时的模拟步数
    private _lastHudTime = 0;          // 上次 HUD 刷新时刻

    private _pool: IWorkerExecutor | null = null;
    // 脚本模式：预览环境下由 resources TextAsset 转成的 blob URL（缓存复用，onDestroy 释放）
    private _workerScriptUrl: string | null = null;
    // 池代数令牌：销毁池/切模式后使在途的异步脚本 URL 解析回调失效，防止旧回调"复活"池
    private _poolGen = 0;
    // 脚本 URL 是否正在异步解析（池尚未建好，此时不应退出 simulateNoWorker 模拟）
    private _poolInitializing = false;
    private _workerBusy = false;
    private _lastDt = 1 / 60;
    private _lastMode: ComputeMode = ComputeMode.MAIN_THREAD;
    private _lastWorkerManagement = WorkerManagement.WORKER_POOL;

    // 多 Worker 分块：本帧已完成的块数 / 目标块数，以及每个块的待回填结果
    private _multiWorkerCount = 1;
    private _multiDone = 0;
    private _multiTotal = 0;
    private _multiResults: IChunkResult[] = [];
    private _multiChunks: { start: number; end: number }[] = [];

    // 统计
    private _accCompute = 0;
    private _accApply = 0;
    private _accFrame = 0;
    private _accFrames = 0;
    private _frameT0 = 0;
    private _hud: Label | null = null;
    private _modeButton: Label | null = null;
    private _frameCounter = 0;

    // ---- simulateNoWorker 辅助字段 ----
    private _noWorkerSimActive = false;
    private _noWorkerSimVerified = false;  // 是否已确认 fallback 生效

    // ---------------- 生命周期 ----------------

    public start (): void {
        this._normalizeLegacyMode();
        this._ensureCamera();
        this._buildHUD();
        this._lastWorkerManagement = this.workerManagement;
        this._lastMode = this.mode; // rebuild 内部会按当前模式建 Worker，避免 _syncMode 重复创建
        this.rebuild(this.count);
        this._lastSampleAt = performance.now();
        this._emitTrace('case-start');

        director.on(Director.EVENT_BEFORE_UPDATE, this._onBeforeUpdate, this);
        director.on(Director.EVENT_AFTER_DRAW, this._onAfterDraw, this);
    }

    public onDestroy (): void {
        this._emitTrace('case-stop');
        director.off(Director.EVENT_BEFORE_UPDATE, this._onBeforeUpdate, this);
        director.off(Director.EVENT_AFTER_DRAW, this._onAfterDraw, this);
        this._destroyPool();
        if (this._workerScriptUrl) {
            URL.revokeObjectURL(this._workerScriptUrl);
            this._workerScriptUrl = null;
        }
        if (this._host) {
            this._host.destroy();
            this._host = null;
        }
        if (this._createdCamera) {
            this._createdCamera.destroy();
            this._createdCamera = null;
        }
        this._trace.dispose();
    }

    /** 销毁现有球体并按新数量重建，可在运行时调用。 */
    public rebuild (n: number): void {
        this._destroyPool();
        this._clearSpheres();
        this.count = Math.max(0, Math.floor(n));

        if (!this._mesh) {
            this._mesh = utils.createMesh(primitives.sphere(this.radius, {
                segments: 16,
            }));
        }
        if (!this._host) {
            this._host = new Node('SphereHost');
            this.node.addChild(this._host);
        }

        this._pos = new Float32Array(this.count * 3);
        this._vel = new Float32Array(this.count * 3);
        this._prevPos = new Float32Array(this.count * 3);

        const b = this.bounds;
        for (let i = 0; i < this.count; i++) {
            const node = new Node(`Sphere_${i}`);
            node.layer = Layers.Enum.DEFAULT;

            const renderer = node.addComponent(MeshRenderer);
            renderer.mesh = this._mesh;
            renderer.material = this._createMaterial();

            const ix = i * 3;
            this._pos[ix] = (Math.random() * 2 - 1) * b;
            this._pos[ix + 1] = (Math.random() * 2 - 1) * b;
            this._pos[ix + 2] = (Math.random() * 2 - 1) * b;
            this._randomVelocity(i);
            node.setPosition(this._pos[ix], this._pos[ix + 1], this._pos[ix + 2]);

            this._host.addChild(node);
            this._nodes.push(node);
        }
        // 插值起点与初始权威位置一致：首批结果回传前画面静止在初始位，无跳变
        this._prevPos.set(this._pos);

        if (this._isWorkerMode(this.mode)) {
            this._ensurePool();
            this._sendToWorkerMulti();
        }
        console.log(`[RandomSpheres] 已创建 ${this.count} 个球体，模式=${ComputeMode[this.mode]}`);
    }

    // ---------------- 每帧 ----------------

    public update (dt: number): void {
        this._lastDt = dt;
        if (dt > 0) {
            this._renderFps = this._renderFps * 0.9 + (1 / dt) * 0.1;  // 真实渲染帧率（帧间隔 EMA）
        }
        this._frameCounter++;
        this._syncMode();
        this._observeBackend();

        let computeMs = 0;
        let applyMs = 0;

        if (this.mode === ComputeMode.MAIN_THREAD) {
            // 单线程：重计算 + 应用位置都在主线程，每帧都是新位置，直接计时
            let t = performance.now();
            computeKernel(this._pos, this._vel, this.count, this.mathIterations, dt, this.bounds);
            computeMs = performance.now() - t;

            t = performance.now();
            this._applyPositions();
            applyMs = performance.now() - t;
        } else {
            // worker 模式：渲染与模拟解耦。
            //  - 结果到齐（_hasPending）才发起下一批计算（lock-step 发任务，避免任务堆积）；
            //  - 画面每帧都插值渲染（_renderInterpolated），不再"只在回传帧跳变、中间帧冻结"。
            // 即使微信 V1 上模拟更新率只有 ~10Hz，渲染仍是 60fps 平滑运动。
            if (this._hasPending) {
                this._hasPending = false;
                this._sendToWorkerMulti();
            }
            const t = performance.now();
            this._renderInterpolated();
            applyMs = performance.now() - t;
        }

        this._accCompute += computeMs;
        this._accApply += applyMs;
        this._accFrames++;

        const sampleNow = performance.now();
        if (this.telemetryEnabled && sampleNow - this._lastSampleAt >= Math.max(1, this.telemetryIntervalSeconds) * 1000) {
            this._lastSampleAt = sampleNow;
            this._emitTrace('sample', { renderFps: this._renderFps, simulationSteps: this._simSteps });
        }
        if (this._frameCounter % 20 === 0) {
            this._updateHUD();
        }
    }

    private _onBeforeUpdate (): void {
        this._frameT0 = performance.now();
    }

    private _onAfterDraw (): void {
        this._accFrame += performance.now() - this._frameT0;
    }

    private _applyPositions (): void {
        const pos = this._pos;
        const nodes = this._nodes;
        for (let i = 0, l = nodes.length; i < l; i++) {
            const ix = i * 3;
            nodes[i].setPosition(pos[ix], pos[ix + 1], pos[ix + 2]);
        }
    }

    /**
     * worker 模式每帧渲染：在上一批权威位置 _prevPos 与最新权威位置 _pos 之间按时间插值。
     * alpha = (now - 上次结果到齐时刻) / 模拟步间隔，clamp 到 [0,1]。
     * 渲染落后模拟约一个 worker 往返，换取 60fps 视觉连续——这是实时仿真里
     * "异步模拟步 + 渲染插值" 的标准取舍（Valve interpolation / Gaffer "Fix Your Timestep"）。
     * 单线程模式不用它（每帧都是新位置，直接 _applyPositions）。
     */
    private _renderInterpolated (): void {
        const prev = this._prevPos;
        const curr = this._pos;
        const nodes = this._nodes;
        let alpha = 1;
        if (this._simInterval > 0 && this._lastResultTime > 0) {
            alpha = (performance.now() - this._lastResultTime) / this._simInterval;
            if (alpha < 0) { alpha = 0; } else if (alpha > 1) { alpha = 1; }
        }
        for (let i = 0, l = nodes.length; i < l; i++) {
            const ix = i * 3;
            const x = prev[ix] + (curr[ix] - prev[ix]) * alpha;
            const y = prev[ix + 1] + (curr[ix + 1] - prev[ix + 1]) * alpha;
            const z = prev[ix + 2] + (curr[ix + 2] - prev[ix + 2]) * alpha;
            nodes[i].setPosition(x, y, z);
        }
    }


    /** 旧场景保存的 4/5 原本只控制池大小，统一迁移为自动模式。 */
    private _normalizeLegacyMode (): void {
        if ((this.mode as number) === 4 || (this.mode as number) === 5) {
            this.mode = ComputeMode.WORKER_AUTO;
        }
    }

    private _isWorkerMode (m: ComputeMode): boolean {
        return m === ComputeMode.WORKER_INLINE
            || m === ComputeMode.WORKER_SCRIPT
            || m === ComputeMode.WORKER_AUTO;
    }

    /** 运行时切换 mode：进出 / 在不同 Worker 模式之间切换时正确交接缓冲区与池。 */
    private _syncMode (): void {
        this._normalizeLegacyMode();
        if (this.mode === this._lastMode && this.workerManagement === this._lastWorkerManagement) {
            return;
        }
        const from = this._lastMode;
        const managementChanged = this.workerManagement !== this._lastWorkerManagement;
        this._lastWorkerManagement = this.workerManagement;
        this._lastMode = this.mode;
        this._updateModeButtonLabel();
        this._emitTrace('mode-change');

        const fromWorker = this._isWorkerMode(from);
        const toWorker = this._isWorkerMode(this.mode);

        if (fromWorker && !toWorker) {
            // 离开 Worker 模式 → 主线程：终止池；若缓冲区已被移交（detached），从节点位置重建
            this._destroyPool();
            this._ensureValidBuffers();
        } else if (toWorker && (from !== this.mode || managementChanged)) {
            // 进入 Worker 模式（从主线程，或从另一种 Worker 模式切来）：重建池并发起首次计算。
            // 不同 Worker 模式的池配置不同（函数/脚本/微信），必须销毁重建。
            this._destroyPool();
            this._ensureValidBuffers();
            this._ensurePool();
            this._sendToWorkerMulti();
        }
    }

    /** 若 _pos/_vel 已被 Transferable 移交（detached）或尺寸不符，从节点位置重建。 */
    private _ensureValidBuffers (): void {
        const need = this.count * 3;
        const detached = this._pos.buffer.byteLength === 0 || this._vel.buffer.byteLength === 0;
        if (this._pos.length !== need || detached) {
            this._pos = new Float32Array(need);
            this._vel = new Float32Array(need);
            for (let i = 0; i < this.count; i++) {
                const p = this._nodes[i].position;
                const ix = i * 3;
                this._pos[ix] = p.x;
                this._pos[ix + 1] = p.y;
                this._pos[ix + 2] = p.z;
                this._randomVelocity(i);
            }
        }
        // 插值起点与权威位置对齐，并清空计时，避免模式切换后用陈旧 alpha 插值出跳变
        if (this._prevPos.length !== need) {
            this._prevPos = new Float32Array(need);
        }
        this._prevPos.set(this._pos);
        this._lastResultTime = 0;
        this._simInterval = 0;
    }

    // ---------------- Worker（引擎线程池 / Demo 直接管理） ----------------

    /** 仅对本组件模拟 Web 无 Worker，不修改全局对象或 PAL 的能力缓存。 */
    private _enterNoWorkerSim (): void {
        this._noWorkerSimActive = this.simulateNoWorker && getWorkerCapabilities().supportsFunctionWorker;
    }

    private _exitNoWorkerSim (): void {
        if (!this._noWorkerSimActive) return;
        this._noWorkerSimVerified = this._pool?.backend === 'sync';
        this._noWorkerSimActive = false;
    }

    /**
     * 按当前模式创建执行器。三种 worker 模式都按可用并发数分块，区别只在 worker 代码来源 / 后端：
     *   - WORKER_INLINE：函数模式，worker 代码由 computeChunkKernel.toString() 生成；
     *   - WORKER_SCRIPT：脚本模式，worker 代码在独立 .js 文件（Web 走 new Worker(path)）；
     *   - WORKER_AUTO：脚本模式，显式请求 maxWorkers，由平台能力决定实际并发上限。
     */
    private _resolvePoolConcurrency (): number {
        if (!this._pool) {
            return this._multiWorkerCount;
        }
        if (this._pool.backend === 'sync' || this._pool.backend === 'none') return 1;
        // concurrency 是池的并发上限，不是已启动的线程数量。
        // 兼容尚未重新生成 concurrency 声明的编辑器，回退时仍受平台上限约束。
        const precise = (this._pool as unknown as { concurrency?: number }).concurrency;
        if (typeof precise === 'number' && precise > 0) {
            return precise;
        }
        const cap = getWorkerCapabilities().concurrencyLimit;
        return (cap > 0 && Number.isFinite(cap)) ? cap : this._multiWorkerCount;
    }

    private _ensurePool (): void {
        this._normalizeLegacyMode();
        if (this._pool || this._poolInitializing) {
            return;
        }
        if ([getWorkerCapabilities, getOptimalWorkerCount, checkWorkerScript].some(api => typeof api !== 'function')) {
            this._lastError = 'Missing basic Worker feature';
            this._emitTrace('fallback', { reason: this._lastError });
            console.warn('[RandomSpheres] 当前引擎未提供 Worker 基础 API，请启用 worker 并重新构建。');
            this.mode = ComputeMode.MAIN_THREAD;
            this._lastMode = this.mode;
            this._updateModeButtonLabel();
            return;
        }
        // 脚本模式兜底：无任何 worker 后端时主线程同步执行（与 worker 脚本 runTask 等价）
        const scriptFallback: WorkerTask = (
            pos: Float32Array, vel: Float32Array, start: number, end: number,
            mathIter: number, dt: number, bounds: number,
        ) => computeChunkKernel(pos, vel, start, end, mathIter, dt, bounds);

        if (this.mode === ComputeMode.WORKER_INLINE) {
            // 内嵌函数模式：按逻辑核数（留一个核给主线程）并行；idleReleaseAfter=0 常驻不释放
            this._multiWorkerCount = getOptimalWorkerCount();
            this._enterNoWorkerSim();
            try {
                this._pool = createDemoExecutor(computeChunkKernel as unknown as WorkerTask, {
                    maxWorkers: this._multiWorkerCount,
                    idleReleaseAfter: 0,
                }, this.workerManagement, this._noWorkerSimActive);
                this._pool.recheck();
            } catch (error) {
                this._destroyPool();
                this.mode = ComputeMode.MAIN_THREAD;
                this._lastError = String(error);
                this._emitTrace('fallback', { reason: this._lastError });
                console.warn('[RandomSpheres] 执行器创建失败，回退主线程', error);
                return;
            } finally {
                this._exitNoWorkerSim();
            }
            this._observeBackend();
            this._emitTrace('executor-ready');
            // Fix1：分块数封顶到池实际并行度，避免单 worker 平台多块串行排队、成倍放大往返延迟
            const poolConcurrency = this._resolvePoolConcurrency();
            this._multiWorkerCount = Math.min(this._multiWorkerCount, poolConcurrency);
            console.log(`[RandomSpheres] 执行器已创建 mode=${ComputeMode[this.mode]} `
                + `backend=${this._pool?.backend} concurrency=${poolConcurrency}`);
            return;
        }

        // 平台自动模式请求池大小，版本选择始终交给平台运行时。
        this._multiWorkerCount = this.mode === ComputeMode.WORKER_AUTO
            ? (Number.isFinite(this.maxWorkers) ? Math.max(1, Math.floor(this.maxWorkers)) : 4)
            : getOptimalWorkerCount();

        // 脚本 URL 可能需要异步解析（预览下从 resources TextAsset 转 blob），池在回调里创建。
        // 调用方随后的 _sendToWorkerMulti() 会因 _pool 为空而跳过，由回调补发首帧任务。
        const gen = ++this._poolGen;
        this._poolInitializing = true;
        this._resolveWorkerScriptUrl(gen).then((url) => {
            if (gen !== this._poolGen || this._pool) {
                return; // 解析期间池已销毁 / 模式已切换，放弃本次创建
            }
            this._poolInitializing = false;
            const caps = getWorkerCapabilities();
            const status = checkWorkerScript(url);
            console.log(`[RandomSpheres] Worker 能力 available=${caps.available} `
                + `parallel=${caps.parallel} limit=${caps.concurrencyLimit} transfer=${caps.supportsTransfer}; `
                + `脚本 ready=${status.ready} version=${status.version} reason=${status.reason}`);
            this._enterNoWorkerSim();
            try {
                this._pool = createDemoExecutor(url, {
                    maxWorkers: this._multiWorkerCount,
                    idleReleaseAfter: 0,
                    // 超时看门狗：worker 若因脚本未打包/平台异常而永不回消息，到点自动判失败 →
                    // 引擎 respawn/回退主线程，而不是让 _workerBusy 永远卡住（抖音"卡死"的兜底）。
                    timeout: 5000,
                    fallback: scriptFallback,
                }, this.workerManagement, this._noWorkerSimActive);
                this._pool.recheck();
            } finally {
                this._exitNoWorkerSim();
            }
            this._observeBackend();
            this._emitTrace('executor-ready', { script: url, capabilities: {
                available: caps.available, supportsStandardWorker: caps.supportsStandardWorker,
                supportsTransfer: caps.supportsTransfer, concurrencyLimit: Number.isFinite(caps.concurrencyLimit) ? caps.concurrencyLimit : 'unbounded',
            } });
            // Fix1：分块数封顶到池实际并行度（微信 V1 上 concurrency=1 → 只发 1 块，消除 4 块串行往返）
            const poolConcurrency = this._resolvePoolConcurrency();
            this._multiWorkerCount = Math.min(this._multiWorkerCount, poolConcurrency);
            console.log(`[RandomSpheres] 执行器已创建 mode=${ComputeMode[this.mode]} `
                + `backend=${this._pool?.backend} concurrency=${poolConcurrency} script=${url}`);
            this._sendToWorkerMulti();
        }).catch((err) => {
            if (gen !== this._poolGen) {
                return;
            }
            this._poolInitializing = false;
            this._exitNoWorkerSim();
            this._lastError = String(err);
            this._destroyPool();
            this.mode = ComputeMode.MAIN_THREAD;
            this._emitTrace('fallback', { reason: this._lastError });
            console.warn('[RandomSpheres] Worker 初始化失败，回退到主线程', err);
        });
    }

    /**
     * 解析 worker 脚本 URL：
     * - 构建后（BUILD=true）：直接用真实路径 WORKER_SCRIPT_PATH；
     * - 编辑器/预览（BUILD=false）：预览服务器不伺服项目根原始文件（404 → new Worker(path) onerror），
     *   改从 resources 的 TextAsset 加载脚本原文，转成同源 blob: URL（引擎侧仍走脚本模式
     *   createWorkerFromPath 流程，new Worker(blobUrl)）。blob URL 缓存复用，onDestroy 释放。
     */
    private _resolveWorkerScriptUrl (gen: number): Promise<string> {
        if (BUILD) {
            return Promise.resolve(WORKER_SCRIPT_PATH);
        }
        if (this._workerScriptUrl) {
            return Promise.resolve(this._workerScriptUrl);
        }
        return new Promise((resolve, reject) => {
            resources.load(WORKER_TEXT_ASSET, TextAsset, (err, asset) => {
                if (gen !== this._poolGen) {
                    resolve(WORKER_SCRIPT_PATH); // 过期加载不再创建 Blob URL，防止销毁后泄漏。
                    return;
                }
                if (err || !asset) {
                    reject(err || new Error(`TextAsset 未找到: ${WORKER_TEXT_ASSET}`));
                    return;
                }
                const BlobCtor = globalThis.Blob;
                if (!BlobCtor || typeof URL === 'undefined' || !URL.createObjectURL) {
                    resolve(WORKER_SCRIPT_PATH); // 无法转 blob，给真实路径（池将走同步 fallback）
                    return;
                }
                const blob = new BlobCtor([asset.text], { type: 'application/javascript' });
                this._workerScriptUrl = URL.createObjectURL(blob);
                resolve(this._workerScriptUrl);
            });
        });
    }

    /**
     * 多 Worker 分块并行：把 [0, count) 按 worker 数均分成若干块，
     * 每块作为一个独立任务丢进池里并行算，全部完成后再合并回填。
     *
     * Fix4（只传切片 + 绝不移交权威缓冲）：
     *   - 每块只发自己区间 [start,end) 的切片，而非完整数组 → 克隆/传输量降到 1/wc；
     *   - 权威 _pos/_vel 永不被 Transferable 移交（detach）。支持 transfer 的平台把切片拷进
     *     独立缓冲再移交（每块各拥有自己的 buffer，互不冲突）；不支持的（微信 V1）发纯数字数组切片。
     *     这样主线程每帧都能安全读 _pos 做渲染插值（_renderInterpolated），不会读到被移交后的空缓冲。
     */
    private _sendToWorkerMulti (): void {
        if (!this._pool || this._workerBusy || this._pos.length === 0 || this.count === 0) {
            // 结束本次组件级无 Worker 模拟状态。
            if (!this._poolInitializing) {
                this._exitNoWorkerSim();
            }
            return;
        }
        this._workerBusy = true;
        const gen = this._poolGen;
        const pool = this._pool;
        this._expectedBatch = null;
        this._validationCpuMs = 0;
        const interval = Math.floor(this.validationEveryBatches);
        if (interval > 0 && (this._lastVerifiedGeneration !== this._poolGen || this._completedBatches % interval === 0)) {
            const started = performance.now();
            this._expectedBatch = computeKernel(this._pos.slice(), this._vel.slice(), this.count,
                this.mathIterations, this._lastDt, this.bounds);
            this._validationCpuMs = performance.now() - started;
        }
        this._batchStarted = performance.now();

        // 运行中可能已退回同步执行，下一批任务随实际池并发上限收缩到一块。
        const wc = Math.max(1, Math.min(this._multiWorkerCount, this._resolvePoolConcurrency(), this.count));
        this._multiTotal = wc;
        this._multiDone = 0;
        this._multiResults = new Array<IChunkResult>(wc);
        this._multiChunks = new Array<{ start: number; end: number }>(wc);

        // 均分区间
        const per = Math.floor(this.count / wc);
        const rem = this.count % wc;
        let cursor = 0;
        for (let c = 0; c < wc; c++) {
            const size = per + (c < rem ? 1 : 0);
            const start = cursor;
            const end = cursor + size;
            cursor = end;
            this._multiChunks[c] = { start, end };
        }

        // 微信 V1 等平台的 worker 边界走结构化克隆，且**不保留 TypedArray**：Float32Array 过界后
        // 退化成普通对象，按下标读出 undefined → 计算全 NaN。纯数字数组可无损克隆。
        // Web / 微信 V2（supportsTransfer）保留 TypedArray + 零拷贝 transfer。
        const supportsTransfer = getWorkerCapabilities().supportsTransfer;

        for (let c = 0; c < wc; c++) {
            const { start, end } = this._multiChunks[c];
            // 只取本块区间的切片（subarray 是视图，不拷贝）
            const posSlice = this._pos.subarray(start * 3, end * 3);
            const velSlice = this._vel.subarray(start * 3, end * 3);
            let posPayload: any;
            let velPayload: any;
            let transfer: any[];
            if (supportsTransfer) {
                // 拷进独立缓冲再移交：每块各拥有自己的 buffer，互不 detach，且不碰权威 _pos/_vel
                const pc = new Float32Array(posSlice);
                const vc = new Float32Array(velSlice);
                posPayload = pc;
                velPayload = vc;
                transfer = [pc.buffer, vc.buffer];
            } else {
                // V1：发纯数字数组切片（仅本块区间，克隆量降到 1/wc）
                posPayload = Array.from(posSlice);
                velPayload = Array.from(velSlice);
                transfer = [];
            }
            pool.run<IChunkResult>(
                [posPayload, velPayload, start, end, this.mathIterations, this._lastDt, this.bounds],
                transfer,
            ).then((res) => {
                if (gen !== this._poolGen || pool !== this._pool) return;
                this._multiResults[c] = res;
                this._multiDone++;
                if (this._multiDone === this._multiTotal) {
                    this._mergeMultiResults();
                }
            }).catch((err) => {
                if (gen !== this._poolGen || pool !== this._pool) return;
                this._destroyPool(); // 使同一批其他任务的回调失效，保留主线程权威数据。
                this._workerBusy = false;
                this._lastError = String(err);
                this.mode = ComputeMode.MAIN_THREAD;
                this._emitTrace('fallback', { reason: this._lastError });
                console.warn('[RandomSpheres] Worker 计算失败，回退到主线程', err);
            });
        }

        // 结束本次组件级无 Worker 模拟状态。
        this._exitNoWorkerSim();
    }

    /**
     * 合并所有分块结果：旧权威态快照进 _prevPos（插值起点），新结果原地写回 _pos/_vel，
     * 并更新插值计时（_lastResultTime / _simInterval）。缓冲区不再被 transfer，可安全原地复用。
     */
    private _mergeMultiResults (): void {
        this._observeBackend();
        this._lastRoundTripMs = performance.now() - this._batchStarted;
        const reference = this._expectedBatch;
        const checkingStarted = performance.now();
        try {
            // Check every chunk before writing any authoritative state: malformed/partial results cannot corrupt it.
            for (let c = 0; c < this._multiTotal; c++) {
                const result = this._multiResults[c];
                const { start, end } = this._multiChunks[c];
                const size = (end - start) * 3;
                if (!result || result.positions?.length !== size || result.velocities?.length !== size) {
                    throw new Error(`Worker chunk ${c} has invalid buffer lengths`);
                }
                for (let i = 0; i < size; i++) {
                    const position = result.positions[i], velocity = result.velocities[i];
                    if (!Number.isFinite(position) || !Number.isFinite(velocity)) throw new Error(`Non-finite Worker chunk ${c}:${i}`);
                    if (reference && (Math.abs(position - reference.positions[start * 3 + i]) > 1e-5
                        || Math.abs(velocity - reference.velocities[start * 3 + i]) > 1e-5)) {
                        throw new Error(`Worker/main-thread mismatch at chunk ${c}:${i}`);
                    }
                }
            }
        } catch (error) {
            this._validationFailures++;
            this._lastError = String(error);
            this._emitTrace('validation-failed', { reason: this._lastError });
            throw error;
        }
        this._validationCpuMs += performance.now() - checkingStarted;
        const now = performance.now();
        // 估算模拟步间隔（结果到齐周期），作为插值 alpha 的分母；EMA 平滑，clamp 防异常值
        if (this._lastResultTime > 0) {
            const interval = now - this._lastResultTime;
            if (interval > 0 && interval < 1000) {
                this._simInterval = this._simInterval > 0
                    ? this._simInterval * 0.7 + interval * 0.3
                    : interval;
            }
        }
        this._lastResultTime = now;

        // 旧权威位置 → 插值起点（必须在覆盖 _pos 之前快照）
        this._prevPos.set(this._pos);

        // 新结果按区间原地回填到权威 _pos/_vel
        for (let c = 0; c < this._multiTotal; c++) {
            const { start } = this._multiChunks[c];
            const r = this._multiResults[c];
            const base = start * 3;
            this._pos.set(r.positions, base);
            this._vel.set(r.velocities, base);
        }

        this._simSteps++;
        this._hasPending = true;
        this._workerBusy = false;
        this._completedBatches++;
        if (reference) {
            this._validatedBatches++;
            this._lastVerifiedGeneration = this._poolGen;
        }
        this._expectedBatch = null;
        this._multiResults = [];
        this._multiChunks = [];
        if (reference) this._emitTrace('validation-pass');
        if (this._firstCompletedGeneration !== this._poolGen) {
            this._firstCompletedGeneration = this._poolGen;
            this._emitTrace('first-batch');
        }
    }

    private _destroyPool (): void {
        if (this._pool || this._poolInitializing) this._emitTrace('executor-stop');
        this._expectedBatch = null;
        this._observedBackend = '';
        this._poolGen++; // 使在途的异步脚本 URL 解析回调失效
        this._poolInitializing = false;
        if (this._pool) {
            this._pool.terminate();
            this._pool = null;
        }
        this._workerBusy = false;
        this._hasPending = false;
        this._multiDone = 0;
        this._multiTotal = 0;
        this._multiResults = [];
        this._multiChunks = [];
        // 清理组件级模拟状态。
        this._exitNoWorkerSim();
    }

    // ---------------- HUD / 相机 / 材质 ----------------

    private _updateHUD (): void {
        if (!this._hud || this._accFrames === 0) {
            return;
        }
        const frames = this._accFrames;
        const compute = this._accCompute / frames;
        const apply = this._accApply / frames;
        const frame = this._accFrame / frames;
        const modeName = modeDisplayName(this.mode);
        const management = this.workerManagement === WorkerManagement.DIRECT_WORKER ? '直接 Worker' : 'WorkerPool';
        const isWorker = this._isWorkerMode(this.mode);

        // Fix2：模拟更新率（sim Hz）= 两次 HUD 刷新之间权威结果回传次数 / 时间间隔。
        // worker 模式下它远低于渲染帧率（微信 V1 上约 7~15Hz），正是"FPS 高却顿挫"的根因；
        // 插值（_renderInterpolated）用渲染帧率把画面补帧平滑回 60fps。两者并列展示便于对照验证。
        const now = performance.now();
        let simHz = 0;
        if (this._lastHudTime > 0) {
            const elapsed = (now - this._lastHudTime) / 1000;
            if (elapsed > 0) {
                simHz = (this._simSteps - this._simStepsAtLastHud) / elapsed;
            }
        }
        this._lastHudTime = now;
        this._simStepsAtLastHud = this._simSteps;

        // 渲染帧率（真实 tick 率，dt 的 EMA）；worker 模式额外展示模拟更新率，凸显渲染/模拟解耦。
        const rateLine = isWorker
            ? `渲染 FPS: ${this._renderFps.toFixed(0)} | 模拟更新: ${simHz.toFixed(1)} Hz（插值补帧至渲染帧率）`
            : `渲染 FPS: ${this._renderFps.toFixed(0)}（单线程每帧即模拟步）`;

        let workerInfo = '';
        if (isWorker) {
            const backend = this._pool?.backend;
            const caps = getWorkerCapabilities();
            if (!backend) {
                workerInfo = `${management} 准备中`;
            } else if (backend === 'sync') {
                workerInfo = `管理方式：${management} | 实际执行：主线程同步降级 | backend=sync`;
            } else if (backend === 'none') {
                workerInfo = `管理方式：${management} | 实际执行：不可用 | backend=none`;
            } else {
                const concurrency = this._resolvePoolConcurrency();
                const chunks = Math.max(1, Math.min(this._multiWorkerCount, concurrency, this.count));
                workerInfo = `管理方式：${management} | 实际执行：Worker 线程 | backend=${backend}\n`
                    + `并发上限=${concurrency} | 分块=${chunks} | `
                    + (concurrency > 1 ? '可并行计算' : '单 Worker 异步卸载')
                    + ` | transfer=${caps.supportsTransfer} | 标准能力标志=${caps.supportsStandardWorker}`;
            }
        }

        if (this.simulateNoWorker) {
            const simStatus = this._noWorkerSimVerified
                ? 'fallback 生效（同步执行）'
                : (this._noWorkerSimActive ? '等待验证...' : '未生效或未验证');
            workerInfo += `\n[simulateNoWorker] ${simStatus}`;
        }

        this._hud.string = `模式: ${modeName} | 球数: ${this.count} | 计算量: ${this.mathIterations}\n`
            + `主线程计算: ${compute.toFixed(2)} ms | 应用位置: ${apply.toFixed(2)} ms | 整帧 CPU: ${frame.toFixed(2)} ms\n`
            + `${rateLine}\n`
            + workerInfo;

        // if (this._frameCounter % 120 === 0) {
        //     console.log(`[RandomSpheres] ${modeName} | n=${this.count} iter=${this.mathIterations} | `
        //         + `compute=${compute.toFixed(2)}ms apply=${apply.toFixed(2)}ms frame=${frame.toFixed(2)}ms `
        //         + `renderFps=${this._renderFps.toFixed(0)}`
        //         + (isWorker
        //             ? ` simHz=${simHz.toFixed(1)} workers=${this._multiWorkerCount} backend=${this._pool?.backend}` : ''));
        // }

        this._accCompute = 0;
        this._accApply = 0;
        this._accFrame = 0;
        this._accFrames = 0;
    }

    private _randomVelocity (i: number): void {
        let x = Math.random() * 2 - 1;
        let y = Math.random() * 2 - 1;
        let z = Math.random() * 2 - 1;
        const len = Math.sqrt(x * x + y * y + z * z) || 1;
        const s = this.speed * (0.5 + Math.random());
        const ix = i * 3;
        this._vel[ix] = (x / len) * s;
        this._vel[ix + 1] = (y / len) * s;
        this._vel[ix + 2] = (z / len) * s;
    }

    private _createMaterial (): Material {
        const mat = new Material();
        mat.initialize({ effectName: 'builtin-unlit' });
        mat.setProperty('mainColor', new Color(
            Math.floor(Math.random() * 256),
            Math.floor(Math.random() * 256),
            Math.floor(Math.random() * 256),
            255,
        ));
        return mat;
    }

    private _clearSpheres (): void {
        for (let i = 0; i < this._nodes.length; i++) {
            const node = this._nodes[i];
            const renderer = node.getComponent(MeshRenderer);
            if (renderer && renderer.material) {
                renderer.material.destroy();
            }
            node.destroy();
        }
        this._nodes.length = 0;
    }

    private _ensureCamera (): void {
        const scene = director.getScene();
        if (!scene) {
            return;
        }
        const existing = scene.getComponentsInChildren(Camera);
        if (existing.length > 0) {
            return;
        }

        const camNode = new Node('RandomSpheres Camera');
        camNode.layer = Layers.Enum.DEFAULT;
        const cam = camNode.addComponent(Camera);
        cam.projection = Camera.ProjectionType.PERSPECTIVE;
        cam.fov = 50;
        cam.near = 0.1;
        cam.far = 1000;
        cam.clearColor = new Color(30, 30, 36, 255);
        // 3D 相机不渲染 UI 层（HUD 由 UI 相机负责）
        cam.visibility = Layers.makeMaskExclude([Layers.BitMask.UI_2D, Layers.BitMask.UI_3D]);
        camNode.setPosition(0, this.bounds * 0.8, this.bounds * 2.2);
        camNode.lookAt(new Vec3(0, 0, 0));
        scene.addChild(camNode);
        this._createdCamera = camNode;
    }

    private _buildHUD (): void {
        const scene = director.getScene()!;
        let canvasNode = scene.getChildByName('Canvas');
        let canvasComp = canvasNode ? canvasNode.getComponent(Canvas) : null;

        if (!canvasNode || !canvasComp) {
            canvasNode = new Node('Canvas');
            canvasNode.layer = Layers.Enum.UI_2D;
            canvasNode.addComponent(UITransform).setContentSize(960, 640);

            const camNode = new Node('UI Camera');
            camNode.layer = Layers.Enum.DEFAULT;
            const camComp = camNode.addComponent(Camera);
            camComp.projection = Camera.ProjectionType.ORTHO;
            camComp.orthoHeight = 320;
            camComp.near = 0;
            camComp.far = 2000;
            camComp.priority = 1; // 在 3D 相机之上
            camComp.clearFlags = Camera.ClearFlag.DEPTH_ONLY;
            camComp.visibility = Layers.makeMaskExclude([Layers.BitMask.UI_3D]);
            camNode.setPosition(0, 0, 1000);
            canvasNode.addChild(camNode);

            canvasComp = canvasNode.addComponent(Canvas);
            canvasComp.cameraComponent = camComp;
            scene.addChild(canvasNode);
        } else if (!canvasComp.cameraComponent) {
            const camNode = new Node('UI Camera');
            camNode.layer = Layers.Enum.DEFAULT;
            const camComp = camNode.addComponent(Camera);
            camComp.projection = Camera.ProjectionType.ORTHO;
            camComp.orthoHeight = 320;
            camComp.near = 0;
            camComp.far = 2000;
            camComp.priority = 1;
            camComp.clearFlags = Camera.ClearFlag.DEPTH_ONLY;
            camComp.visibility = Layers.makeMaskExclude([Layers.BitMask.UI_3D]);
            camNode.setPosition(0, 0, 1000);
            canvasNode.addChild(camNode);
            canvasComp.cameraComponent = camComp;
        }

        const ut = canvasNode.getComponent(UITransform)!;
        const w = ut.contentSize.width;
        const h = ut.contentSize.height;

        const n = new Node('HUD');
        n.layer = Layers.Enum.UI_2D;
        const trans = n.addComponent(UITransform);
        trans.setAnchorPoint(0, 1);
        const label = n.addComponent(Label);
        label.fontSize = 16;
        label.lineHeight = 22;
        label.horizontalAlign = Label.HorizontalAlign.LEFT;
        label.verticalAlign = Label.VerticalAlign.TOP;
        label.color = new Color(255, 220, 80, 255);
        label.string = '';
        n.setPosition(-w / 2 + 12, h / 2 - 12, 0);
        canvasNode.addChild(n);
        this._hud = label;

        this._buildModeButton(canvasNode, w, h);
    }

    /** 构建模式切换按钮（底部居中），点击循环：单线程 → Worker（自动）。 */
    private _buildModeButton (canvasNode: Node, w: number, h: number): void {
        const btnW = Math.min(360, w - 40);
        const btnH = 64;

        const btnNode = new Node('ModeButton');
        btnNode.layer = Layers.Enum.UI_2D;
        canvasNode.addChild(btnNode);
        const btnUt = btnNode.addComponent(UITransform);
        btnUt.setContentSize(btnW, btnH);
        btnUt.setAnchorPoint(0.5, 0.5);
        btnNode.setPosition(0, -h / 2 + btnH / 2 + 40, 0);

        // 背景：内置白色精灵帧 + 染色。拿不到精灵帧也不影响点击（Button 命中靠 UITransform）。
        const bg = btnNode.addComponent(Sprite);
        // const sf = builtinResMgr ? builtinResMgr.get<SpriteFrame>('default-spriteframe') : null;
        // if (sf) {
        //     bg.spriteFrame = sf;
        // }
        bg.type = Sprite.Type.SIMPLE;
        // sizeMode 默认 TRIMMED 会把背景缩成精灵帧原始尺寸（2×2），必须设 CUSTOM 跟随 UITransform。
        bg.sizeMode = Sprite.SizeMode.CUSTOM;
        bg.color = new Color(40, 130, 220, 230);

        // Button 组件（按压缩放反馈；zoomScale 需 >1，<1 会触发 touchCancel）
        const button = btnNode.addComponent(Button);
        button.target = btnNode;
        button.transition = Button.Transition.SCALE;
        button.zoomScale = 1.1;

        // 按钮文字
        const labelNode = new Node('ModeButtonLabel');
        labelNode.layer = Layers.Enum.UI_2D;
        btnNode.addChild(labelNode);
        const labelUt = labelNode.addComponent(UITransform);
        labelUt.setContentSize(btnW, btnH);
        labelUt.setAnchorPoint(0.5, 0.5);
        const btnLabel = labelNode.addComponent(Label);
        btnLabel.horizontalAlign = Label.HorizontalAlign.CENTER;
        btnLabel.verticalAlign = Label.VerticalAlign.CENTER;
        btnLabel.fontSize = 26;
        btnLabel.lineHeight = 30;
        btnLabel.color = new Color(255, 255, 255, 255);

        btnNode.on(Button.EventType.CLICK, this._onModeButtonClick, this);

        this._modeButton = btnLabel;
        this._updateModeButtonLabel();
    }

    /** 按钮点击：循环切换到下一个模式（单线程 → Worker（自动） → …）。 */
    private _onModeButtonClick (): void {
        const idx = MODE_CYCLE.indexOf(this.mode);
        this.mode = MODE_CYCLE[(idx + 1) % MODE_CYCLE.length];
        this._updateModeButtonLabel();
        // update() 里的 _syncMode 会检测到 mode 变化，销毁旧池并按新模式重建。
    }

    /** 刷新按钮文字为当前模式名。 */
    private _updateModeButtonLabel (): void {
        if (this._modeButton && this._modeButton.isValid) {
            this._modeButton.string = `模式: ${modeDisplayName(this.mode)}（点击切换）`;
        }
    }
}
