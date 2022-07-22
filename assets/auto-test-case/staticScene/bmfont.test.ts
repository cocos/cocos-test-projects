// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('bmfont')
@testClass('bmfont')
export class bmfont {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}