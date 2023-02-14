import { find } from 'cc';
// @ts-ignore
import { captureOneImage, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('editbox-events')
// @testClass('EditboxEvents')
export class EditboxEvents {
    _dt = 5;

    @testCase
    async startPlay() {
        await screenshot_custom(this._dt);
    }

    @testCase
    async edit() {
        // @ts-ignore
        find('Canvas/eventedit/New EditBox').getComponent('cc.EditBox').string = 'hello world';
        await screenshot_custom(this._dt);
    }


}