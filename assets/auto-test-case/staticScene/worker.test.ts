import { director, getWorkerCapabilities } from 'cc';
// @ts-ignore
import { runScene, testClass, testCase, beforeClass, afterClass, waitForFrames } from 'db://automation-framework/runtime/test-framework.mjs';
import { RandomSpheres } from '../../cases/scene/worker-test/worker_test';
import type { IWorkerCaseSnapshot } from '../../cases/scene/worker-test/worker_test';

@runScene('worker')
@testClass('WorkerTestcase')
export class WorkerTestcase {
    private _demo!: RandomSpheres;

    @beforeClass
    async setup () {
        await waitForFrames(3);
        const demo = director.getScene()?.getComponentInChildren(RandomSpheres);
        if (!demo) throw new Error('Worker testcase component not found in worker.scene');
        this._demo = demo;
    }

    @afterClass
    cleanup () {
        this._demo?.configureTest({ management: 'pool', mode: 'main' });
    }

    @testCase
    async pool_matches_main_thread () {
        this._demo.configureTest({ management: 'pool', mode: 'worker' });
        this._record('pool_matches_main_thread', await this._waitVerified());
    }

    @testCase
    async direct_worker_matches_main_thread () {
        this._demo.configureTest({ management: 'direct', mode: 'worker' });
        this._record('direct_worker_matches_main_thread', await this._waitVerified());
    }

    @testCase
    async rapid_switch_cannot_revive_old_workers () {
        this._demo.configureTest({ management: 'pool', mode: 'worker' });
        this._demo.configureTest({ management: 'direct', mode: 'worker' });
        this._demo.configureTest({ management: 'direct', mode: 'main' });
        const generation = this._demo.getTestSnapshot().generation;
        await waitForFrames(10);
        const snapshot = this._demo.getTestSnapshot();
        if (snapshot.mode !== 'main' || snapshot.backend !== 'main' || snapshot.busy || snapshot.initializing
            || snapshot.generation !== generation || snapshot.completedBatches !== 0) {
            throw new Error(`Old Worker revived after switching: ${JSON.stringify(snapshot)}`);
        }
        this._record('rapid_switch_cannot_revive_old_workers', snapshot);
    }

    @testCase
    async web_component_fallback_is_explicit () {
        if (!getWorkerCapabilities().supportsFunctionWorker) {
            console.log('[worker-test] ' + JSON.stringify({ testcase: 'worker-test', event: 'acceptance-skip',
                case: 'web_component_fallback_is_explicit', reason: 'Web-only component simulation is unavailable on this host' }));
            return;
        }
        for (const management of ['pool', 'direct'] as const) {
            this._demo.configureTest({ management, mode: 'worker', simulateNoWorker: true });
            const snapshot = await this._waitVerified();
            if (snapshot.backend !== 'sync') throw new Error(`Expected explicit synchronous fallback: ${JSON.stringify(snapshot)}`);
            this._record(`web_component_fallback_${management}`, snapshot);
        }
    }

    private async _waitVerified (): Promise<IWorkerCaseSnapshot> {
        const deadline = Date.now() + 10000;
        do {
            const snapshot = this._demo.getTestSnapshot();
            if (snapshot.validationFailures || snapshot.lastError || snapshot.mode === 'main') {
                throw new Error(`Worker acceptance failed: ${JSON.stringify(snapshot)}`);
            }
            if (snapshot.validatedBatches > 0 && ['worker', 'sync'].includes(snapshot.backend)) return snapshot;
            await waitForFrames(2);
        } while (Date.now() < deadline);
        throw new Error(`Worker acceptance timed out: ${JSON.stringify(this._demo.getTestSnapshot())}`);
    }

    private _record (name: string, snapshot: IWorkerCaseSnapshot): void {
        // A sync result proves recovery/computation correctness, never real Worker execution.
        console.log('[worker-test] ' + JSON.stringify({ testcase: 'worker-test', event: 'acceptance-pass',
            case: name, execution: snapshot.backend, ...snapshot }));
    }
}
