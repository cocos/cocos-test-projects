// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('layout-scrollview')
@testClass('layout_scrollview')
export class layout_scrollview {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}