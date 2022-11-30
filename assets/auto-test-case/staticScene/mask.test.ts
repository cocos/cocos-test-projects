// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('mask')
@testClass('mask')
export class mask {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}