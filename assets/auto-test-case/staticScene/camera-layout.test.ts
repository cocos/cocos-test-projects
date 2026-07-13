// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('camera-layout')
@testClass('CameraLayout')
export class CameraLayout {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}