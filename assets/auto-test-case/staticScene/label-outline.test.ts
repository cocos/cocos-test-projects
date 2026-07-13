// @ts-ignore
import { captureOneImage, waitForFrames, runScene, testCase, testClass, PlatformEnum } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('label-outline')
@testClass('LabelOutline', undefined, [PlatformEnum.WINDOWS])
export class LabelOutline {
    @testCase
    async startPlay() {
        await waitForFrames();
        await captureOneImage();
    }
}