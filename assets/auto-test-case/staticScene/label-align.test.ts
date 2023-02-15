// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('label-align')
@testClass('LabelAlign')
export class LabelAlign {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}