// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('mask-nesting')
@testClass('mask_nesting')
export class mask_nesting {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}