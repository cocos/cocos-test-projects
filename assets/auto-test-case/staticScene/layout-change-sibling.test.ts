// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('layout-change-sibling')
@testClass('LayoutChangeSibling')
export class LayoutChangeSibling {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}