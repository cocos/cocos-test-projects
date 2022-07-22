// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('filter')
@testClass('filter')
export class filter {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}