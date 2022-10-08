// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('material-upgrade')
@testClass('material_upgrade')
export class material_upgrade {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}