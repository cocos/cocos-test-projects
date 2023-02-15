// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('mask-nesting')
@testClass('MaskNesting')
export class MaskNesting {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}