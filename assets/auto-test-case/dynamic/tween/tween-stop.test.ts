// @ts-ignore
import { captureOneImage, runScene, sleep, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('tween-stop')
@testClass('TweenStop')
export class TweenStop {
    _dt = 3;

    @testCase
    async index() {
        await screenshot_custom(this._dt);
    }

    @testCase
    async play() {
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(this._dt * 8    );
        }
    }

    @testCase
    async end() {
        await screenshot_custom(this._dt * 100);
    }
}

