// @ts-ignore
import { captureOneImage, runScene, sleep, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom, screenshot_custom_by_wait } from '../common/utils';

@runScene('tween-repeat-forever')
@testClass('TweenRepeatForever')
export class TweenRepeatForever {
    _dt = 20;

    @testCase
    async start() {
        await screenshot_custom();
    }

    @testCase
    async play() {
        for (let i = 0; i < 4; i++) {
            await screenshot_custom(this._dt * 20);
        }
    }

    @testCase
    async end() {
        await screenshot_custom_by_wait(this._dt + 100);
    }
}

