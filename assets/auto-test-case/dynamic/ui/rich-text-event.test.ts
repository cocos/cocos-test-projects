import { find } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('rich-text-event')
@testClass('RichTextEvent')
export class RichTextEvent {
    _dt = 2;

    @testCase
    async startPlay() {
        await screenshot_custom(this._dt);
    }

    @testCase
    async onSingleClick() {
        // @ts-ignore
        find('Canvas/target').getComponent('RichTextEvent').onClick('', '');
        await screenshot_custom(this._dt * 10);
    }

    @testCase
    async onDoubleClick() {
        // @ts-ignore
        find('Canvas/target').getComponent('RichTextEvent').onClick('', '');
        // @ts-ignore
        find('Canvas/target').getComponent('RichTextEvent').onClick('', '');
        await screenshot_custom(this._dt * 10);
    }

    @testCase
    async end() {
        await screenshot_custom(this._dt + 100);
    }
}