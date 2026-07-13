// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('shadowCulling')
@testClass('ShadowCulling')
export class ShadowCulling {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}