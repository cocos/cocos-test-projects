// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('sliced-sprite')
@testClass('sliced_sprite')
export class sliced_sprite {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}