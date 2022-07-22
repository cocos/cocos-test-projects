// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('advance-widget')
@testClass('advance_widget')
export class advance_widget {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}