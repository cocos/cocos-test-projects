// @ts-ignore
import { runScene, testCase, testClass,sleep } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('safe-area')
@testClass('SafeArea')
export class SafeArea {
    _dt = 30;

    @testCase
    async start(){
        await screenshot_custom(this._dt);
    }
}