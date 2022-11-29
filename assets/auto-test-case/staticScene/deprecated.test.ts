// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('deprecated')
@testClass('Deprecated')
export class Deprecated {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}