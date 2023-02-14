// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('render-ui-to-spriteframe')
@testClass('RenderUiToSpriteframe')
export class RenderUiToSpriteframe {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}