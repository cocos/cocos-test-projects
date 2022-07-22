// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('opacity-multi-canvas')
@testClass('opacity_multi_canvas')
export class opacity_multi_canvas {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}