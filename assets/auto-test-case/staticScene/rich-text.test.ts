// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../dynamic/common/utils'
import { find } from 'cc'

@runScene('rich-text')
@testClass('RichText')
export class RichText {
    _dt = 20
    @testCase
    async startPlay() {
        await screenshot_custom();
    }

    @testCase
    async onSingleClick() {
        // @ts-ignore
        find('Canvas/Layout/<img>').getComponent('RichTextEvent').onClick()
        await screenshot_custom(this._dt);
    }

    @testCase
    async onDoubleClick() {
        // @ts-ignore
        find('Canvas/Layout/<img>').getComponent('RichTextEvent').onClick()
        // @ts-ignore
        find('Canvas/Layout/<img>').getComponent('RichTextEvent').onClick()
        await screenshot_custom(this._dt);
    }

    @testCase
    async end() {
        await screenshot_custom(this._dt * 20);
    }
}