// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('capture_to_web')
@testClass('capture_to_web')
export class capture_to_web {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}