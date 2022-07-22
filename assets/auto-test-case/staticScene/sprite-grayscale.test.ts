// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('sprite-grayscale')
@testClass('sprite_grayscale')
export class sprite_grayscale {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}