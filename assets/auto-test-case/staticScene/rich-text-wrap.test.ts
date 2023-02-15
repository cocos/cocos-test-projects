// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('rich-text-wrap')
@testClass('RichTextWrap')
export class RichTextWrap {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}