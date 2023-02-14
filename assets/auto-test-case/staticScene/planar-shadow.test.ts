// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('planar-shadow')
@testClass('PlanarShadow')
export class PlanarShadow {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}