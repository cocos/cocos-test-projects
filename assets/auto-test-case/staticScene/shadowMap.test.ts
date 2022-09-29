// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('shadowMap')
@testClass('shadowMap')
export class shadowMap {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}