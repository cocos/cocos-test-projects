// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('opacity')
@testClass('Opacity')
export class Opacity {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}