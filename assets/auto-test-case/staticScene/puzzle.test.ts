// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('puzzle')
@testClass('puzzle')
export class puzzle {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}