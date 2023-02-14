// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('cailbration')
@testClass('Cailbration')
export class Cailbration {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}