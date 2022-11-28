// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('dependAsset')
@testClass('DependAsset')
export class DependAsset {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}