/** Demo-side execution adapter. Direct mode uses only the basic Worker feature. */
import * as cc from 'cc';
import { createWorker, getWorkerCapabilities, checkWorkerScript } from 'cc';
import type { IWorker, WorkerTask, WorkerPool, WorkerPoolOptions } from 'cc';

export enum WorkerManagement {
    WORKER_POOL = 0,
    DIRECT_WORKER = 1,
}

export interface IWorkerExecutor {
    readonly backend: 'worker' | 'sync' | 'none';
    readonly concurrency: number;
    run<T = unknown>(args?: unknown[], transfer?: Transferable[]): Promise<T>;
    recheck(): 'worker' | 'sync' | 'none';
    terminate(): void;
}

interface IPending {
    id: number;
    resolve: (value: unknown) => void;
    reject: (error: Error) => void;
    timer: ReturnType<typeof setTimeout> | null;
}
interface ISlot {
    worker: IWorker;
    pending: IPending | null;
}

/** Fixed workers managed by the demo: one in-flight request per worker, no task queue or replay. */
export class DirectWorkerExecutor implements IWorkerExecutor {
    public backend: 'worker' | 'sync' | 'none' = 'sync';
    public concurrency = 1;
    private _slots: ISlot[] = [];
    private _closed = false;
    private _id = 0;
    private _fallback: WorkerTask | undefined;
    private _timeout: number;

    constructor(task: string | WorkerTask, options: WorkerPoolOptions, forceSync = false) {
        this._fallback = typeof task === 'function' ? task : options.fallback;
        this._timeout = options.timeout ?? 5000;
        const caps = getWorkerCapabilities();
        if (forceSync || !caps.available || (typeof task === 'function' && !caps.supportsFunctionWorker)
            || (typeof task === 'string' && !checkWorkerScript(task).ready)) {
            this.backend = this._fallback ? 'sync' : 'none';
            return;
        }
        const requested = Number.isFinite(options.maxWorkers) ? Math.max(1, Math.floor(options.maxWorkers!)) : 4;
        const limit = Number.isFinite(caps.concurrencyLimit) ? caps.concurrencyLimit : requested;
        const count = Math.max(1, Math.min(requested, limit));
        try {
            for (let i = 0; i < count; i++) {
                const worker = typeof task === 'function' ? createWorker(task) : createWorker(task);
                const slot: ISlot = { worker, pending: null };
                this._slots.push(slot);
                worker.onMessage(message => this._onMessage(slot, message));
                worker.onError(error => {
                    if (this._slots.includes(slot)) this._fail(new Error(String(error?.message || error)));
                });
                if (this._closed) throw new Error('Worker failed during initialization.');
            }
            this.backend = 'worker';
            this.concurrency = count;
        } catch (error) {
            // No request has been sent during construction, so synchronous fallback is safe.
            this.terminate();
            this._closed = false;
            this.backend = this._fallback ? 'sync' : 'none';
            this.concurrency = 1;
            console.warn('[DirectWorker] creation failed; using main-thread fallback:', error);
        }
    }

    public recheck(): 'worker' | 'sync' | 'none' { return this.backend; }

    public run<T = unknown>(args: unknown[] = [], transfer: Transferable[] = []): Promise<T> {
        if (this._closed) return Promise.reject(new Error('Direct Worker executor terminated.'));
        if (this.backend === 'sync' && this._fallback) {
            const fallback = this._fallback;
            return Promise.resolve().then(() => {
                if (this._closed) throw new Error('Direct Worker executor terminated.');
                return fallback(...args) as T;
            });
        }
        if (this.backend !== 'worker') return Promise.reject(new Error('No direct Worker or fallback available.'));
        const slot = this._slots.find(candidate => !candidate.pending);
        if (!slot) return Promise.reject(new Error('Direct Worker busy: this demo does not queue requests.'));
        return new Promise<T>((resolve, reject) => {
            const pending: IPending = { id: ++this._id, resolve: value => resolve(value as T), reject, timer: null };
            slot.pending = pending;
            if (this._timeout > 0) {
                pending.timer = setTimeout(() => this._fail(new Error('Direct Worker request timed out.')), this._timeout);
            }
            try { slot.worker.postMessage({ id: pending.id, args }, transfer); }
            catch (error) { this._fail(error instanceof Error ? error : new Error(String(error))); }
        });
    }

    private _onMessage(slot: ISlot, message: any): void {
        if (this._closed || !this._slots.includes(slot) || !slot.pending) return;
        if (!message || typeof message.id !== 'number' || typeof message.ok !== 'boolean') {
            this._fail(new Error('Invalid direct Worker response.'));
            return;
        }
        if (message.id !== slot.pending.id) return; // Ignore stale replies.
        const pending = slot.pending;
        slot.pending = null;
        if (pending.timer !== null) clearTimeout(pending.timer);
        if (message.ok) pending.resolve(message.value);
        else pending.reject(new Error(String(message.error || 'Worker task failed.')));
    }

    private _fail(error: Error): void {
        this._dispose(error); // Never replay a request whose buffers might have been transferred.
    }

    private _dispose(error: Error): void {
        if (this._closed) return;
        this._closed = true;
        this.backend = 'none';
        const slots = this._slots;
        this._slots = [];
        for (const slot of slots) {
            const pending = slot.pending;
            slot.pending = null;
            if (pending) {
                if (pending.timer !== null) clearTimeout(pending.timer);
                pending.reject(error);
            }
            try { slot.worker.terminate(); } catch (error) { console.warn('[DirectWorker] terminate failed:', error); }
        }
    }

    public terminate(): void { this._dispose(new Error('Direct Worker executor terminated.')); }
}

export function createDemoExecutor(
    task: string | WorkerTask, options: WorkerPoolOptions, management: WorkerManagement, forceSync = false,
): IWorkerExecutor {
    if (management === WorkerManagement.DIRECT_WORKER || forceSync) return new DirectWorkerExecutor(task, options, forceSync);
    // An optional feature cannot be a named runtime import: worker-only builds have no such export.
    // Read the configured engine namespace at runtime; type-only imports above are erased.
    const Pool = Reflect.get(cc, 'WorkerPool') as typeof WorkerPool | undefined;
    if (typeof Pool !== 'function') throw new Error('请启用 worker-pool feature，或选择直接 Worker 模式。');
    return new Pool(task, options);
}
