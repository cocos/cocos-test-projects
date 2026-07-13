// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('render-texture-sample')
@testClass('RenderTextureSample')
export class RenderTextureSample {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}