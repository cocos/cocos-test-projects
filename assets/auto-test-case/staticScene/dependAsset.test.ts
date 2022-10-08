// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('dependAsset')
@testClass('dependAsset')
export class dependAsset {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}