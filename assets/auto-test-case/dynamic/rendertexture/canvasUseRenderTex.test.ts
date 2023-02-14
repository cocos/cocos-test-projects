// @ts-ignore
import { captureOneImage, runScene, sleep, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('canvasUseRenderTex')
@testClass('CanvasUseRenderTex')
export class CanvasUseRenderTex {
    _dt = 3;

    @testCase
    async startPlay() {
        await screenshot_custom(this._dt);
    }

    @testCase
    async await_3s() {
        await sleep(3)
        await screenshot_custom(this._dt);
    }
}