// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('layout-grid-contraint')
@testClass('LayoutGridContraint')
export class LayoutGridContraint {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}