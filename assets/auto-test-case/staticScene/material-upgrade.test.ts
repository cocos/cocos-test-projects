// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('material-upgrade')
@testClass('MaterialUpgrade')
export class MaterialUpgrade {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}