// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('simple')
@testClass('Simple')
export class Simple {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}