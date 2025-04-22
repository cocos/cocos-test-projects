// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../dynamic/common/utils';
@runScene('ui-opacity')
@testClass('UiOpacity')
export class UiOpacity {
    @testCase
    async startPlay() {
        await screenshot_custom_by_wait(20);
    }
}