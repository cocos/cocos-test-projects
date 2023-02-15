// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('widget-percentage')
@testClass('WidgetPercentage')
export class WidgetPercentage {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}