// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('sliced-sprite')
@testClass('SlicedSprite')
export class SlicedSprite {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}