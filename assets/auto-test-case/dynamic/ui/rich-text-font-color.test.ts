import { find } from 'cc';
// @ts-ignore
import { testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@testClass('RichTextFontColor', 'rich-text-font-color')
export class RichTextFontColor {
    _frameCount = 50;

    @testCase
    async startPlay() {
        for (let i = 0; i < 4; i++) {
            await screenshot_custom(this._frameCount);
        };
    }
}