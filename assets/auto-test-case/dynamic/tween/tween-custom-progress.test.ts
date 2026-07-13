// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('tween-custom-progress')
@testClass('TweenCustomProgress')
export class TweenCustomProgress {
    _delay = 0.5;
    _dt = 30;

    @testCase
    async startPlay() {
        await screenshot_custom();
    }

    @testCase
    async move() {
        await screenshot_custom(this._dt * 2 + 10);
    }

    @testCase
    async enLarge() {
        await screenshot_custom(this._dt * 3);
    }

    @testCase
    async endPlay() {
        await screenshot_custom(this._dt * 4);
    }

}