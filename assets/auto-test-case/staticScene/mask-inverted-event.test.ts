// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('mask-inverted-event')
@testClass('mask_inverted_event')
export class mask_inverted_event {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}