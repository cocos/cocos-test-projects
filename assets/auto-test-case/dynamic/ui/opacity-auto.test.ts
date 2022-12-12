// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('opacity-auto')
@testClass('OpacityAuto')
export class OpacityAuto {
    _dt = 70;

    @testCase
    async index() {
        await screenshot_custom(this._dt);
    }

    @testCase
    async play() {
        for (let i = 0; i < 7; i++) {
            await screenshot_custom(this._dt);
        }
    }
}