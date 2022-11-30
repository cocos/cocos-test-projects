// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('altas')
@testClass('altas')
export class altas {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}