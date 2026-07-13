// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('layout-basic-horizontal')
@testClass('LayoutBasicHorizontal')
export class LayoutBasicHorizontal {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}