// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('single-compress')
@testClass('single_compress')
export class single_compress {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}