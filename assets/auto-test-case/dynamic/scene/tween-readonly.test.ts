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
        for (let i=0; i<4; i++) {
            await screenshot_custom(38);
        }
    }
}
