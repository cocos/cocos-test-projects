// @ts-ignore
import { testCase, testClass, afterClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom, waitSceneLaunched } from '../common/utils';
import { find, sys } from 'cc';
import { StaticUI } from '../../../cases/ui/19.static-ui/static-ui';

@testClass('StaticUi', 'static-ui')
export class StaticUi {
    _dt = 10;

    @testCase
    async play() {
        let caseScript;
        await screenshot_custom(this._dt);
        for (let i = 0; i < 12; i++) {
            caseScript = find("background")!.getComponent("StaticUI") as StaticUI;
            caseScript.unschedule(caseScript.func);
            await caseScript.func();
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