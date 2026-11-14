/** Low-frequency, structured checkpoints for Worker testcase acceptance. */
let nextRun = 0;
export class WorkerTestTrace {
    public readonly runId = `worker-${Date.now().toString(36)}-${++nextRun}`;
    private _sequence = 0;
    private _marks = new Set<string>();

    public emit(event: string, detail: object): void {
        const entry = { testcase: 'worker-test', runId: this.runId, sequence: ++this._sequence,
            event, timestamp: Date.now(), ...detail };
        console.log(`[worker-test] ${JSON.stringify(entry)}`);
        // Keep at most one User Timing mark per event for this component instance.
        const name = `worker-test:${this.runId}:${event}`;
        try {
            if (typeof performance !== 'undefined' && typeof performance.mark === 'function') {
                performance.clearMarks?.(name);
                performance.mark(name);
                this._marks.add(name);
            }
        } catch { /* Diagnostics must not interfere with task execution. */ }
    }
    public dispose(): void {
        for (const name of this._marks) {
            try { performance.clearMarks?.(name); } catch { /* Optional User Timing API. */ }
        }
        this._marks.clear();
    }
}
