// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('load-atlas-texture')
@testClass('LoadAtlasTexture')
export class LoadAtlasTexture {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}