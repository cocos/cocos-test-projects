// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('audio')
@testClass('audio')
export class audio {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}