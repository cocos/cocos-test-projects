// @ts-ignore
import { runScene, testCase, testClass, sleep } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('tween-clone')
@testClass('TweenClone')
export class TweenClone {
    _delay = 1;
    _dt = 30;

    @testCase
    async startPlay() {
        await screenshot_custom();
    }


    @testCase
    async captureChangBig() {
        await screenshot_custom(2 * this._dt);
        await screenshot_custom(3 * this._dt);
        await screenshot_custom(5 * this._dt);
    }

}