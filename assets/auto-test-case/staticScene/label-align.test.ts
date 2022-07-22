// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('label-align')
@testClass('label_align')
export class label_align {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}