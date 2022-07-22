// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('graphics-mask')
@testClass('graphics_mask')
export class graphics_mask {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}