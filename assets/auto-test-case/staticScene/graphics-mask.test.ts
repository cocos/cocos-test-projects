// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('graphics-mask')
@testClass('GraphicsMask')
export class GraphicsMask {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}