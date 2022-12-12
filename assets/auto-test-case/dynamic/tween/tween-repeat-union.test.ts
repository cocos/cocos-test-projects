// @ts-ignore
import { captureOneImage, runScene, sleep, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('tween-repeat-union')
@testClass('TweenRepeatRnion')
export class TweenRepeatRnion {
    _dt = 10;

    @testCase
    async start() {
        await screenshot_custom();
    }


    @testCase
    async playToPre() {
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(this._dt * 5);
        }
    }

    @testCase
    async zoomToOut() {
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(this._dt * 30);
        }
    }

    @testCase
    async end() {
        await screenshot_custom(this._dt * 100);
    }

}

