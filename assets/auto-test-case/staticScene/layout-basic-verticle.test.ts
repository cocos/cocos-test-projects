// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('layout-basic-verticle')
@testClass('LayoutBasicVerticle')
export class LayoutBasicVerticle {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}