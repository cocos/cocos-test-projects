// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('render-ui-to-model')
@testClass('RenderUiToModel')
export class RenderUiToModel {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}