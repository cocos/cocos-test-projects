// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('camera-layout')
@testClass('camera_layout')
export class camera_layout {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}