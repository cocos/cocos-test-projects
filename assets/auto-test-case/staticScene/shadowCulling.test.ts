// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('shadowCulling')
@testClass('shadowCulling')
export class shadowCulling {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}