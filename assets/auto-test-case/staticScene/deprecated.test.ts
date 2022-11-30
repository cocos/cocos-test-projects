// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('deprecated')
@testClass('deprecated')
export class deprecated {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}