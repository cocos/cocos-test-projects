// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('use-render-texture-asset')
@testClass('UseRenderTextureAsset')
export class UseRenderTextureAsset {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}