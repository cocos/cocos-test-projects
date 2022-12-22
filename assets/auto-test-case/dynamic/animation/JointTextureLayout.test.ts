// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';

@runScene('JointTextureLayout')
@testClass('JointTextureLayout')
export class JointTextureLayout {
    _dt = 110;
    _delay = 2;

    @testCase
    async stand() {
        await screenshot_custom_by_wait(this._dt);
    }

    @testCase
    async comeDown() {
        await screenshot_custom_by_wait(69);
    }
}