// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('label-spacing-x')
@testClass('label_spacing_x')
export class label_spacing_x {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}