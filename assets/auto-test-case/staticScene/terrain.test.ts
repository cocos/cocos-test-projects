// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('terrain')
@testClass('terrain')
export class terrain {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}