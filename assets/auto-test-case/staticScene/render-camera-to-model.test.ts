// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('render-camera-to-model')
@testClass('RenderCameraToModel')
export class RenderCameraToModel {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}