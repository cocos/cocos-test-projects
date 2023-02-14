import { find,sys } from 'cc';
// @ts-ignore
import { runScene } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';
@runScene('restart')
// @testClass('Restart')
export class Restart {
    _dt = 3;

    // @testCase
    async startPlay() {
        for (let i = 0; i < 5; i++) {
            await screenshot_custom(this._dt);
        }
    }

    // @testCase
    async restart() {
        // @ts-ignore
        find('Canvas').getComponent('Restart').restart();
        for (let i = 0; i < 5; i++) {
            await screenshot_custom(this._dt);
        }
    }

    // @testCase
    async onAndroidRestart() {
        // @ts-ignore
        if (sys.platform === sys.Platform.ANDROID || sys.platform === sys.Platform.IOS) {
            // @ts-ignore
            find('Canvas').getComponent('Restart').restart();
            for (let i = 0; i < 5; i++) {
                await screenshot_custom(this._dt);
            }
        }
    }
}