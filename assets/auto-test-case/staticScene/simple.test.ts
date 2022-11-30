// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('simple')
@testClass('simple')
export class simple {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}