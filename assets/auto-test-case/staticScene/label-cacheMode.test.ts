// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('label-cacheMode')
@testClass('LabelCacheMode')
export class LabelCacheMode {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}