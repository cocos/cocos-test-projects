// @ts-ignore
import { testCase, testClass, afterClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom, waitSceneLaunched } from '../common/utils';
import { sys } from 'cc';

@testClass('StaticUi', 'static-ui')
export class StaticUi {
    _dt = 10;

    @testCase
    async play() {
        let sceneName: string;
        await screenshot_custom(this._dt);
        for (let i = 0; i < 12; i++) {
            sceneName = (i % 2) === 0 ? 'static-ui-replace' : 'static-ui';
            await waitSceneLaunched(sceneName)
            await screenshot_custom(this._dt);
        }
    }

    @afterClass
    async cleanStorage() {
        const local = sys.localStorage;
        const item = local.getItem('ui-static-level');
        if (item) {
            local.removeItem('ui-static-level');
        }
    }
}