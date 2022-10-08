// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('rich-text-align')
@testClass('rich_text_align')
export class rich_text_align {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}