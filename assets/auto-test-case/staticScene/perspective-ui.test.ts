// @ts-ignore
import { beforeClass, testCase, testClass, srandom } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../dynamic/common/utils';

@testClass('Perspectiveui', 'perspective-ui')
export class Perspectiveui {
    @beforeClass
    async initData() {
        srandom('perspective-ui');
    }

    @testCase
    async start() {
        await screenshot_custom(2);
    }
}