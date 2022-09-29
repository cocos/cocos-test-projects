// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('cameraUseRenderTex')
@testClass('cameraUseRenderTex')
export class cameraUseRenderTex {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}