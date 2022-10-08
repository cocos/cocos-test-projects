// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('ttf-font')
@testClass('ttf_font')
export class ttf_font {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}