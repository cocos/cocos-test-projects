// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('mask-inverted-event')
// @testClass('MaskInvertedEvent')
export class MaskInvertedEvent {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}