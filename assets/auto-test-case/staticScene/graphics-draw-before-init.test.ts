// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('graphics-draw-before-init')
@testClass('graphics_draw_before_init')
export class graphics_draw_before_init {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}