// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('opacity-multi-canvas')
@testClass('OpacityMultiCanvas')
export class OpacityMultiCanvas {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}