// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('scroll-view-rotation')
@testClass('scroll_view_rotation')
export class scroll_view_rotation {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}