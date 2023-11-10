// @ts-ignore
import { testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@testClass('BmfontWrap', 'bmfont-wrap')
export class BmfontWrap {
    @testCase
    async start() {
        await screenshot_custom(2);
    }
}
