// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('CoreJsTest')
@testClass('CoreJsTest')
export class CoreJsTest {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}