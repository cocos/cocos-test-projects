// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('load-atlas-texture')
@testClass('load_atlas_texture')
export class load_atlas_texture {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}