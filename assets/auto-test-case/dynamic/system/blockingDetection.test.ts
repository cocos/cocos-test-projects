// @ts-expect-error
import { runScene, testCase, testClass, beforeClass, afterClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { find, game } from 'cc';

@runScene('blockingDetection')
@testClass('BlockingDetectionTest')
export class BlockingDetectionTest {

    @beforeClass
    async setup() {
        game.resume();
    }

    @afterClass
    async teardown() {
        game.pause();
    }

    @testCase
    async setTimeout0() {
        return this.blockForDuration(0, false);
    }

    @testCase
    async setTimeout1000() {
        return this.blockForDuration(1000);
    }

    @testCase
    async setTimeout500() {
        return this.blockForDuration(500);
    }

    async blockForDuration(timeout: number, expectTimeout = true) {
        let timeoutHappend = false;
        this.blockingDetection.externalCallback = () => {
            timeoutHappend = true;
            console.log(`Timeout for ${timeout} ms`);
        }
        this.blockingDetection.onUpdateTimeout(null, '' + timeout);
        const dStart = (new Date).getTime();
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                if(timeoutHappend === expectTimeout) {
                    resolve();
                }else {
                    const dEnd = (new Date).getTime();
                    const dPass = dEnd - dStart;
                    reject(new Error(`Failed on detection timeout ${timeout}ms, ${dPass}ms used! [${expectTimeout ? "timeout expect" : "no timeout expected!"}]`));
                }
            }, this.adjustDelay(timeout));
        });
    }

    private get blockingDetection() {
        return find(`Canvas/Camera`)?.getComponent('BlockingDetection') as any;
    }

    private adjustDelay(n: number) {
        return Math.floor(n  * 1.2) + 500;
    }
}