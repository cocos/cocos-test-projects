// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('tween-repeat')
@testClass('TweenRepeat')
export class TweenRepeat {
    _delay = 0.5;
    _dt = 30;

    @testCase
    async index() {
        await screenshot_custom();
    }

    @testCase
    async play() {
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(this._dt * 2);
        }
    }

    @testCase
    async end() {
        await screenshot_custom(this._dt * 5);
    }
}

