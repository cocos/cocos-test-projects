// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('trimmed')
@testClass('Trimmed')
export class Trimmed {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}