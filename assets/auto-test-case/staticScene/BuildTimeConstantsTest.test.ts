// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('BuildTimeConstantsTest')
@testClass('BuildTimeConstantsTest')
export class BuildTimeConstantsTest {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}