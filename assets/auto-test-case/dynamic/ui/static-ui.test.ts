// @ts-ignore
import { runScene, testCase, testClass, sleep } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('static-ui')
// @testClass('StaticUi')
export class StaticUi {
    _dt = 100;

    @testCase
    async startPlay() {
        await screenshot_custom();
    }

    @testCase
    async play() {
        for (let i = 0; i < 14; i++) {
            await sleep(0.5)
            await screenshot_custom(this._dt * 10);
        }
    }
}