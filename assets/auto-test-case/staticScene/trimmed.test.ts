// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('trimmed')
@testClass('trimmed')
export class trimmed {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}