// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('test-js-list')
@testClass('TestJsList')
export class TestJsList {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}