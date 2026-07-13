// @ts-ignore
import { testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@testClass('TweenReadonly', 'tween-readonly')
export class TweenReadonly {
    @testCase
    async start() {
        await screenshot_custom(2);
    }

    @testCase
    async play() {
        await screenshot_custom(58);
        await screenshot_custom(60);
        await screenshot_custom(1);
    }
}
