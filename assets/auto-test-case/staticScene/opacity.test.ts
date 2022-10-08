// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('opacity')
@testClass('opacity')
export class opacity {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}