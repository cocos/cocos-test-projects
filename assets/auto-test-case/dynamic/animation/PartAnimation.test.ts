import { director } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom,screenshot_custom_by_wait } from '../common/utils';

@runScene('PartAnimation')
@testClass('PartAnimation')
export class PartAnimation {
    _dt = 60;

    @testCase
    async white() {
        await screenshot_custom();
    }

    @testCase
    async yellow(){
        await screenshot_custom_by_wait(this._dt);
    }
}