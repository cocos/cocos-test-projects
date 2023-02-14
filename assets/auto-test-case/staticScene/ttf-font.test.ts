// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('ttf-font')
@testClass('TtfFont')
export class TtfFont {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}