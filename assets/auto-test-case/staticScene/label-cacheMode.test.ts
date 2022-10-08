// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('label-cacheMode')
@testClass('label_cacheMode')
export class label_cacheMode {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}