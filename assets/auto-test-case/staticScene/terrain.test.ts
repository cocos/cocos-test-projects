// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('terrain')
@testClass('Terrain')
export class Terrain {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}