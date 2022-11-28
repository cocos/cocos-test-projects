// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('rich-text-align')
@testClass('RichTextAlign')
export class RichTextAlign {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}