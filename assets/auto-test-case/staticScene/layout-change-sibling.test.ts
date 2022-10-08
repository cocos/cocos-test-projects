// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('layout-change-sibling')
@testClass('layout_change_sibling')
export class layout_change_sibling {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}