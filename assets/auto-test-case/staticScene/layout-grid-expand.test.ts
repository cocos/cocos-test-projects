// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('layout-grid-expand')
@testClass('LayoutGridExpand')
export class LayoutGridExpand {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}