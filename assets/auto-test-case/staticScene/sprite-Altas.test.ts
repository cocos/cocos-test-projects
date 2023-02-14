// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('sprite-Altas')
@testClass('SpriteAltas')
export class SpriteAltas {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}