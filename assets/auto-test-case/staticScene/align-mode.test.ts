// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('align-mode')
@testClass('align_mode')
export class align_mode {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}