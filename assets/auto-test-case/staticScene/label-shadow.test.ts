// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass, PlatformEnum } from 'db://automation-framework/runtime/test-framework.mjs';

@testClass('LabelShadow', 'label-shadow', [PlatformEnum.WINDOWS])
export class LabelShadow {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}