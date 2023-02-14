// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('filter')
@testClass('Filter')
export class Filter {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}