// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('sprite-Altas')
@testClass('sprite_Altas')
export class sprite_Altas {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}