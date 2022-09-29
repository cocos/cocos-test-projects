// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('compressWithGray')
@testClass('compressWithGray')
export class compressWithGray {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}