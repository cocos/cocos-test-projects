// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('altas')
@testClass('Altas')
export class Altas {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}