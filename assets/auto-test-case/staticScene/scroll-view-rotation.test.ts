// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('scroll-view-rotation')
@testClass('ScrollViewRotation')
export class ScrollViewRotation {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}