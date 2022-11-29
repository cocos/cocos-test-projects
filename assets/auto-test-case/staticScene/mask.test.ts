// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('mask')
@testClass('Mask')
export class Mask {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}