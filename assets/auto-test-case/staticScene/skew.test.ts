// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('SkewTest')
@testClass('Skew')
export class Skew {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}