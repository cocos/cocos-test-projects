// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('rich-text-long-string-truncation')
@testClass('RichTextLongStringTruncation')
export class RichTextLongStringTruncation{
    _dt = 5;

    @testCase
    async start(){
       await screenshot_custom(this._dt);
    }
}