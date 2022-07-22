// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('use-render-texture-asset')
@testClass('use_render_texture_asset')
export class use_render_texture_asset {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}