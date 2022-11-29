// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('system-font')
// @testClass('SystemFont')
export class SystemFont {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}