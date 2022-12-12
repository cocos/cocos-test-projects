// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('layout-scrollview')
// @testClass('LayoutScrollview')
export class LayoutScrollview {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}