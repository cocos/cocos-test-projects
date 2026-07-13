// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('cameraUseRenderTex')
@testClass('CameraUseRenderTex')
export class CameraUseRenderTex {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}