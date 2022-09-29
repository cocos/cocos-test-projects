// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('layout-grid-expand')
@testClass('layout_grid_expand')
export class layout_grid_expand {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}