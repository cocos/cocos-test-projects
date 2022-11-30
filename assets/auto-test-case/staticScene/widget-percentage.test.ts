// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('widget-percentage')
@testClass('widget_percentage')
export class widget_percentage {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}