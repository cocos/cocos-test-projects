import { find } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('button-click')
@testClass('ButtonClick')
export class ButtonClick {
    _dt = 5;

    @testCase
    async start(){
        await screenshot_custom()
    }

    @testCase
    async clickSheetOne(){
        //@ts-ignore
        find('Canvas/1/sheep_0').getComponent('cc.Button').clickEvents[0].emit([1]);
        await screenshot_custom(this._dt)
    }

    @testCase
    async clickSheetTwo(){
        //@ts-ignore
        find('Canvas/2/sheep_0').getComponent('cc.Button').clickEvents[0].emit(['绵羊 2 号被点击'])
        await screenshot_custom(this._dt)
    }
}