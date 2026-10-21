/**
 * 独立 worker 脚本 —— RandomSpheres 每帧重计算（分块版），Web + 微信小游戏通用。
 *
 * 实现引擎 worker 协议：
 *   主线程 -> worker : { id: number, args: any[] }
 *   worker -> 主线程 : { id: number, ok: true,  value: any }
 *                    | { id: number, ok: false, error: string }
 *
 * 任务：args = [pos, vel, start, end, mathIter, dt, bounds]
 *   - pos / vel : 本区间切片（长度 (end-start)*3），按局部下标 (i-start)*3 读取；可能通过 Transferable 移交而来
 *   - start/end : 本 worker 负责的全局球下标区间 [start, end)
 *   - 返回 { positions, velocities }：仅含该区间 (end-start)*3 的子缓冲区
 *
 * 与主线程 computeChunkKernel 数学完全一致（扰动项 t 用全局下标 i），保证分块/整块结果可校验。
 *
 * 部署：
 *   - 微信：把本文件放进构建产物的 workers/ 目录，并在 game.json 声明 { "workers": "workers" }。
 *           路径相对小游戏根目录，即 'workers/spheres-worker.js'。V1 仅 1 个 worker，V2 支持多个。
 *   - Web ：保证本文件能以传给池的路径（'workers/spheres-worker.js'）被访问到（拷进构建产物同名目录）。
 *
 * 注意：worker 运行在独立线程，runTask 必须是自包含纯函数，不能访问 cc / 场景 / DOM / 主线程闭包变量。
 */

// 微信 V1 worker 的结构化克隆不保留 TypedArray：Float32Array 过界后退化成普通对象，
// 按下标读取得到 undefined → 计算全 NaN。故在微信侧改用纯数字数组收发（克隆无损）。
// Web / 微信 V2 仍走 TypedArray（可零拷贝）。检测方式与底部消息注册一致。
var IS_WECHAT_WORKER = (typeof worker !== 'undefined' && worker && typeof worker.onMessage === 'function');

// ==== 任务主体：对 [start, end) 区间的球做每帧重计算 ====
function runTask (args) {
    var pos = args[0];
    var vel = args[1];
    var start = args[2];
    var end = args[3];
    var mathIter = args[4];
    var dt = args[5];
    var bounds = args[6];

    var forceScale = 2.0;
    var maxSp = 12;
    var len = end - start;
    var outPos = new Float32Array(len * 3);
    var outVel = new Float32Array(len * 3);

    for (var i = start; i < end; i++) {
        var ix = (i - start) * 3;   // 输入为本区间切片，按局部下标读取
        var x = pos[ix];
        var y = pos[ix + 1];
        var z = pos[ix + 2];
        var vx = vel[ix];
        var vy = vel[ix + 1];
        var vz = vel[ix + 2];

        // 重负载：向量场扰动模拟（每球独立，天然可并行）
        var ax = 0;
        var ay = 0;
        var az = 0;
        for (var k = 0; k < mathIter; k++) {
            var t = k * 0.37 + i * 0.01;   // 用全局下标 i，保证与整块结果一致
            ax += Math.sin(y * 0.5 + t) * Math.cos(z * 0.3 + t * 0.7);
            ay += Math.sin(z * 0.5 + t * 1.1) * Math.cos(x * 0.3 + t);
            az += Math.sin(x * 0.5 + t * 0.9) * Math.cos(y * 0.3 + t * 1.3);
        }
        vx += ax * dt * forceScale;
        vy += ay * dt * forceScale;
        vz += az * dt * forceScale;

        var sp2 = vx * vx + vy * vy + vz * vz;
        if (sp2 > maxSp * maxSp) {
            var inv = maxSp / Math.sqrt(sp2);
            vx *= inv; vy *= inv; vz *= inv;
        }

        x += vx * dt; y += vy * dt; z += vz * dt;

        if (x > bounds) { x = bounds; vx = -Math.abs(vx); }
        else if (x < -bounds) { x = -bounds; vx = Math.abs(vx); }
        if (y > bounds) { y = bounds; vy = -Math.abs(vy); }
        else if (y < -bounds) { y = -bounds; vy = Math.abs(vy); }
        if (z > bounds) { z = bounds; vz = -Math.abs(vz); }
        else if (z < -bounds) { z = -bounds; vz = Math.abs(vz); }

        var o = (i - start) * 3;
        outPos[o] = x; outPos[o + 1] = y; outPos[o + 2] = z;
        outVel[o] = vx; outVel[o + 1] = vy; outVel[o + 2] = vz;
    }
    // 微信 V1：返回纯数字数组（TypedArray 过界会丢类型）。Web/V2：返回 TypedArray。
    if (IS_WECHAT_WORKER) {
        return {
            positions: Array.prototype.slice.call(outPos),
            velocities: Array.prototype.slice.call(outVel),
        };
    }
    return { positions: outPos, velocities: outVel };
}
// =====================================================================

// ---- 消息管线（Web + 微信通用，一般无需修改）--------

function handleMessage (msg) {
    var id = msg && msg.id;
    try {
        var value = runTask(msg && msg.args);
        reply({ id: id, ok: true, value: value });
    } catch (e) {
        reply({ id: id, ok: false, error: String((e && e.message) || e) });
    }
}

function reply (msg) {
    // 微信小游戏：全局 worker 对象
    if (typeof worker !== 'undefined' && worker && typeof worker.postMessage === 'function') {
        worker.postMessage(msg);
        return;
    }
    // Web Worker：全局 self
    if (typeof self !== 'undefined' && typeof self.postMessage === 'function') {
        self.postMessage(msg);
    }
}

// 按当前平台注册消息处理器（二者互斥）
if (typeof worker !== 'undefined' && worker && typeof worker.onMessage === 'function') {
    // 微信小游戏 worker
    worker.onMessage(handleMessage);
} else if (typeof self !== 'undefined') {
    // Web Worker
    self.onmessage = function (e) {
        handleMessage(e && e.data);
    };
}
