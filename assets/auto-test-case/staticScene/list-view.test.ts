// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('list-view')
@testClass('list_view')
export class list_view {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}