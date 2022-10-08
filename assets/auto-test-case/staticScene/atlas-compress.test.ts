// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('atlas-compress')
@testClass('atlas_compress')
export class atlas_compress {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}