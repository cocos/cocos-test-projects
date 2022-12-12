import { find } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('editbox')
@testClass('Editbox')
export class Editbox {
    _dt = 5;

    @testCase
    async startPlay() {
        await screenshot_custom(this._dt);
    }

    @testCase
    async edit() {
        // @ts-ignore
        find('Canvas/single/New EditBox').getComponent('cc.EditBox').string = 'helloworld1234567891011121131415';
        // @ts-ignore
        find('Canvas/password/New EditBox').getComponent('cc.EditBox').string = 'helloworld1234567891011121131415';
        // @ts-ignore
        find('Canvas/mutiple/New EditBox').getComponent('cc.EditBox').string = 'helloworld1234567891011121131415';
        await screenshot_custom(this._dt);
    }

}