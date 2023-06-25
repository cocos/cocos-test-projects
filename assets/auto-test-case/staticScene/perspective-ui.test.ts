// @ts-ignore
import { testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../dynamic/common/utils';

@testClass('Perspectiveui', 'perspective-ui')
export class Perspectiveui {
    @testCase
    async start() {
        await screenshot_custom(2);
    }
}