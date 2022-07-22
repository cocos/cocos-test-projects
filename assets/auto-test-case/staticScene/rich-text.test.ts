// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('rich-text')
@testClass('rich_text')
export class rich_text {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}