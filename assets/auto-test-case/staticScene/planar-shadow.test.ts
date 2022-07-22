// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('planar-shadow')
@testClass('planar_shadow')
export class planar_shadow {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}