// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('multi-canvas')
@testClass('multi_canvas')
export class multi_canvas {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}