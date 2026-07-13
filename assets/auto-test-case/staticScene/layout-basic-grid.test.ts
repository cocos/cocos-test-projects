// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('layout-basic-grid')
@testClass('LayoutBasicGrid')
export class LayoutBasicGrid {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}