// @ts-ignore
import { testCase, testClass, waitForFrames, captureOneImage } from 'db://automation-framework/runtime/test-framework.mjs';

@testClass('LabelCacheModeColor', 'label-cacheMode-color')
export class LabelCacheModeColor {
    @testCase
    async startPlay() {
        await waitForFrames(5);
        await captureOneImage();
    }
}