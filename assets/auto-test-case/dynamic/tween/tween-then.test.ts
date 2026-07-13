// @ts-ignore
import { captureOneImage, runScene, sleep, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('tween-then')
@testClass('TweenThen')
export class TweenThen {
    _dt = 30;

    @testCase
    async index() {
        await screenshot_custom();
    }

    @testCase
    async play() {
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this._dt);
        }
    }

    @testCase
    async end() {
        await screenshot_custom(this._dt + 100);
    }

}

