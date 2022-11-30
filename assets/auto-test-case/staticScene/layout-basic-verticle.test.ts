// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('layout-basic-verticle')
@testClass('layout_basic_verticle')
export class layout_basic_verticle {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}