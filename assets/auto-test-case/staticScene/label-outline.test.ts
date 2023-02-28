// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass, PlatformEnum } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('label-outline')
@testClass('LabelOutline',undefined, [PlatformEnum.WINDOWS])
export class LabelOutline {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}