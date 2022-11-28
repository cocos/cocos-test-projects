// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('graphics-draw-before-init')
// @testClass('GraphicsDrawBeforeInit')
export class GraphicsDrawBeforeInit {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}