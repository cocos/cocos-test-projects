// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('single-compress')
@testClass('SingleCompress')
export class SingleCompress {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}