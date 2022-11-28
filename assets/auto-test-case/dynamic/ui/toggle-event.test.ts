import { find } from 'cc';
// @ts-ignore
import { captureOneImage, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('toggle-event')
@testClass('ToggleEvent')
export class ToggleEvent {
    _dt = 5;

    @testCase
    async startPlay() {
        await screenshot_custom(this._dt);
    }

    @testCase
    async Toggle_TrueOrFalse() {
        // @ts-ignore
        find('Canvas/toggle-event').getComponent('cc.Toggle').isChecked = false;
        await screenshot_custom(this._dt);

         // @ts-ignore
         find('Canvas/toggle-event').getComponent('cc.Toggle').isChecked = true;
         await screenshot_custom(this._dt);
    }


    @testCase
    async Toggle_LeftMiddRight() {
        // @ts-ignore
        find('Canvas/toggle-container-event/中边').getComponent('cc.Toggle').isChecked = true
        await screenshot_custom(this._dt);
        // @ts-ignore
        find('Canvas/toggle-container-event/右边').getComponent('cc.Toggle').isChecked = true
        await screenshot_custom(this._dt);
        // @ts-ignore
        find('Canvas/toggle-container-event/左边').getComponent('cc.Toggle').isChecked = true
        await screenshot_custom(this._dt);
    }

}