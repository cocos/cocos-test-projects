// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('layout-basic-grid')
@testClass('layout_basic_grid')
export class layout_basic_grid {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}