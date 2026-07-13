// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('mask-inverted')
@testClass('MaskInverted')
export class MaskInverted {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}