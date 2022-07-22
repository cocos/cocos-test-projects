// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('scroll-view-events')
@testClass('scroll_view_events')
export class scroll_view_events {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}