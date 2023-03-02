// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../dynamic/common/utils';

@runScene('localization')
@testClass('Localization')
export class Localization {

    @testCase
    async startPlay() {
        await screenshot_custom(1);
    }
}