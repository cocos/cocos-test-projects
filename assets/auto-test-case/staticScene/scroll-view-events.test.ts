// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('scroll-view-events')
// @testClass('ScrollViewEvents')
export class ScrollViewEvents {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}