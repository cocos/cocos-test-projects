// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('render-ui-to-spriteframe')
@testClass('render_ui_to_spriteframe')
export class render_ui_to_spriteframe {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}