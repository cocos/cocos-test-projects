// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('sprite-grayscale')
@testClass('SpriteGrayscale')
export class SpriteGrayscale {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}