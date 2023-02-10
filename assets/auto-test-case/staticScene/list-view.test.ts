// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('list-view')
@testClass('ListView')
export class ListView {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }
}