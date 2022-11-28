// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../dynamic/common/utils';

@runScene('ui-fill-z')
@testClass('UiFillZ')
export class UiFillZ {
    _dt = 10;

    @testCase
    async startPlay() {
        // await waitForNextFrame();
        await screenshot_custom(this._dt);
    }
}