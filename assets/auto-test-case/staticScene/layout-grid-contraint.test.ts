// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('layout-grid-contraint')
@testClass('layout_grid_contraint')
export class layout_grid_contraint {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}