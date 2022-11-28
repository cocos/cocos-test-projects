import { find } from 'cc';
// @ts-ignore
import { sys } from 'cc';
import { runScene } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';
@runScene('restart')
// @testClass('Restart')
export class Restart {
    _dt = 3;

    // @testCase
    async startPlay() {
        for (let i = 0; i < 5; i++) {
            // 截图 or 断言
            await screenshot_custom(this._dt);
        }
    }

    // @testCase
    async restart() {
        // @ts-ignore
        find('Canvas').getComponent('Restart').restart();
        for (let i = 0; i < 5; i++) {
            // 截图 or 断言
            await screenshot_custom(this._dt);
        }
    }

    // @testCase
    async onAndroidRestart() {
        // @ts-ignore
        if (sys.platform === sys.Platform.ANDROID || sys.platform === sys.Platform.IOS) {
            // @ts-ignore
            find('Canvas').getComponent('Restart').restart();
            // 截图 or 断言
            for (let i = 0; i < 5; i++) {
                // 截图 or 断言
                await screenshot_custom(this._dt);
            }
        }
    }
}