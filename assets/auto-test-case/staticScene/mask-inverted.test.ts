// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('mask-inverted')
@testClass('mask_inverted')
export class mask_inverted {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}