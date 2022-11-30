// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('rich-text-wrap')
@testClass('rich_text_wrap')
export class rich_text_wrap {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}