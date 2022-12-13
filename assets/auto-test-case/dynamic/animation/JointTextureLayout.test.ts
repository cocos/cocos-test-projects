import { director } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass, sleep } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('JointTextureLayout')
@testClass('JointTextureLayout')
export class JointTextureLayout {
    _dt = 347;
    _delay = 2;

    @testCase
    async stand() {
        await screenshot_custom(this._dt);
    }

    @testCase
    async comeDown() {
        await screenshot_custom(3652);
    }
}