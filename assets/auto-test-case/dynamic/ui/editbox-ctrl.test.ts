import { find } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('editbox-ctrl')
@testClass('EditboxCtrl')
export class EditboxCtrl {
    _dt = 5;

    @testCase
    async startPlay() {
        await screenshot_custom();
    }

   

    @testCase
    async focusOne() {
        // @ts-ignore
        find('Canvas/ctrl').getComponent('EditboxCtrl').setFocus('cc.EditBox', '1')
        await screenshot_custom(this._dt);
    }

    @testCase
    async input() {
        // // @ts-ignore
        // find('Canvas/ctrl').getComponent('EditboxCtrl').editBox1.string = 'input01'
        // await screenshot_custom(this._dt);
        // @ts-ignore
        find('Canvas/ctrl').getComponent('EditboxCtrl').editBox2.string = 'input02'
        await screenshot_custom(this._dt);
        // @ts-ignore
        find('Canvas/ctrl').getComponent('EditboxCtrl').editBox3.string = 'input03'
        await screenshot_custom(this._dt);
    }

    // @testCase
    // async focusTwo() {
    //     // @ts-ignore
    //     find('Canvas/ctrl').getComponent('EditboxCtrl').setFocus('cc.EditBox', '2')
    //     await screenshot_custom(this._dt);
    // }

    // @testCase
    // async focusThree() {
    //     // @ts-ignore
    //     find('Canvas/ctrl').getComponent('EditboxCtrl').setFocus('cc.EditBox', '3')
    //     await screenshot_custom(this._dt);
    // }

    
}