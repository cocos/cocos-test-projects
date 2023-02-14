// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('compressWithGray')
@testClass('CompressWithGray')
export class CompressWithGray {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}