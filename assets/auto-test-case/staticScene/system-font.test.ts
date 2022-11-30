// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('system-font')
@testClass('system_font')
export class system_font {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}