// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('render-camera-to-model')
@testClass('render_camera_to_model')
export class render_camera_to_model {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}