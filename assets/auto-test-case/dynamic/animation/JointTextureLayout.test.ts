// @ts-ignore
import { testClass, testCase, waitForFrames, captureOneImage } from 'db://automation-framework/runtime/test-framework.mjs';

@testClass('JointTextureLayout', 'JointTextureLayout')
export class JointTextureLayout {
    @testCase
    async startPlay() {
        await waitForFrames(48);
        await captureOneImage();

        await waitForFrames(25);
        await captureOneImage();
    }
}