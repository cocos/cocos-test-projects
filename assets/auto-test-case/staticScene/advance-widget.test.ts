// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../dynamic/common/utils';

@runScene('advance-widget')
@testClass('AdvanceWidget')
export class AdvanceWidget {

    @testCase
    async startPlay() {
        // await waitForNextFrame();
        await screenshot_custom(1);
    }
}