// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('tween-show-hide')
@testClass('TweenShowHide')
export class TweenShowHide {
    _delay = 0.5;
    _dt = 70;

    @testCase
    async index() {
        await screenshot_custom(this._dt-85);
    }

    @testCase
    async play() {
        await screenshot_custom(this._dt);
    }

    @testCase
    async end() {
        await screenshot_custom(this._dt + 8);
    }
}

