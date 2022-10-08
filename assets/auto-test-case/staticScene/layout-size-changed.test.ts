// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('layout-size-changed')
@testClass('layout_size_changed')
export class layout_size_changed {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}