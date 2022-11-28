import { find } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('gamePause')
@testClass('GamePause')
export class GamePause {
    _dt = 100;

    @testCase
    async startPlay() {
        // 截图 or 断言
        await screenshot_custom(this._dt);
    }

    @testCase
    async onResume() {
       this.resume();
    }
    
    @testCase
    async onPause() {
        // @ts-ignore
        find('Canvas').getComponent('button').onPause()
        // 截图 or 断言
        await screenshot_custom(this._dt);
    }

    async resume() {
        // @ts-ignore
        find('Canvas').getComponent('button').onResume()
        // 截图 or 断言
        await screenshot_custom(this._dt);
    }
}