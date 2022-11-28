// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('shadowMap')
@testClass('ShadowMap')
export class ShadowMap {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}