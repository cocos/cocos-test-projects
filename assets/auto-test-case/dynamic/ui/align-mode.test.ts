import { find } from 'cc';
// @ts-ignore
import { captureOneImage, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('align-mode')
@testClass('AlignMode')
export class AlignMode {
    _dt = 5;

    @testCase
    async startPlay() {
        await screenshot_custom(this._dt);
    }

    @testCase
    async always() {
        // @ts-ignore
        find('Canvas/always/change').getComponent('ClickChangeSize').click()
        await screenshot_custom(this._dt);
    }

    @testCase
    async once() {
        // @ts-ignore
        find('Canvas/once/change').getComponent('ClickChangeSize').click()
        await screenshot_custom(this._dt);
    }

    @testCase
    async resize() {
        // @ts-ignore
        find('Canvas/resize/change').getComponent('ClickChangeSize').click()
        await screenshot_custom(this._dt);
    }

}