import { find, sys } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass,sleep } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';

@runScene('safe-area')
@testClass('SafeArea')
export class SafeArea {
    _dt = 30;

    @testCase
    async start(){
        await screenshot_custom_by_wait(this._dt);
    }
}