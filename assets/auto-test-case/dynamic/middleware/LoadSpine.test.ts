// @ts-ignore
import { captureOneImage, runScene, sleep, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('LoadSpine')
// @testClass('LoadSpine')
export class LoadSpine {
    _dt = 5;

    @testCase
    async start() {
        await screenshot_custom();
        await sleep(0.5)
    }

    @testCase
    async play() {
        for (let i = 0; i < 4; i++) {
            await screenshot_custom(this._dt * 2);
        }
    }
}