// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('test-js-list')
@testClass('test_js_list')
export class test_js_list {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}