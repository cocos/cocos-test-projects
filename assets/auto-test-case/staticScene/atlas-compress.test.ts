// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('atlas-compress')
@testClass('AtlasCompress')
export class AtlasCompress {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}