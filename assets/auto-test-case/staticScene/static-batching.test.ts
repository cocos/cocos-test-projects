// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('static-batching')
@testClass('static_batching')
export class static_batching {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}