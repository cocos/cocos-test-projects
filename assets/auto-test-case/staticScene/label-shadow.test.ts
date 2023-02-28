// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass, PlatformEnum } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('label-shadow')
@testClass('LabelShadow',undefined, [PlatformEnum.WINDOWS,PlatformEnum.IOS,PlatformEnum.ANDROID,PlatformEnum.MAC])
export class LabelShadow {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}