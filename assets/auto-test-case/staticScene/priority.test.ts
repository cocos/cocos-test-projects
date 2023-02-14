// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('priority')
@testClass('Priority')
export class Priority {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}