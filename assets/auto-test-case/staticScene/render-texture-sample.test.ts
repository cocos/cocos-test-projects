// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('render-texture-sample')
@testClass('render_texture_sample')
export class render_texture_sample {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}