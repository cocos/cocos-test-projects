// @ts-ignore
import { captureOneImage, runScene, sleep, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';


@runScene('tween-action-callback')
@testClass('TweenActionCallback')
export class TweenActionCallback {
    _dt = 50;
    _delay = 3;

    @testCase
    async startPlay() {
        await screenshot_custom(this._dt);
    }

    @testCase
    async begin() {
        await screenshot_custom(this._dt + 15);
    }

    @testCase
    async test() {
        await screenshot_custom(this._dt + 35);
    }

    @testCase
    async rotate() {
        await screenshot_custom(this._dt + 50);
    }
}