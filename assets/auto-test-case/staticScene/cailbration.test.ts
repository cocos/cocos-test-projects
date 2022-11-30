// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('cailbration')
@testClass('cailbration')
export class cailbration {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}