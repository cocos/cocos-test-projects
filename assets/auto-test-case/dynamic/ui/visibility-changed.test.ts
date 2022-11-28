// @ts-ignore
import { captureOneImage, runScene, sleep, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('visibility-changed')
@testClass('VisibilityChanged')
export class VisibilityChanged {
    _dt = 5;

    @testCase
    async startPlay() {
        await screenshot_custom();
        await sleep(1);
        await screenshot_custom(this._dt);
    }
}