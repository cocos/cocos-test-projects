// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('label-spacing-x')
@testClass('LabelSpacingX')
export class LabelSpacingX {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}