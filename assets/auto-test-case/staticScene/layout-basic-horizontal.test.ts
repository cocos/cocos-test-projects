// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('layout-basic-horizontal')
@testClass('layout_basic_horizontal')
export class layout_basic_horizontal {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}