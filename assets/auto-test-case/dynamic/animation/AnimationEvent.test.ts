// @ts-ignore
import { captureOneImage, runScene, sleep, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('AnimationEvent')
@testClass('AnimationEvent')
export class AnimationEvent {
    public _delay = 1;
    _dt = 100
    @testCase
    async index() {
        // 截图 or 断言
        await screenshot_custom();
    }

    @testCase
    async play_01() {
        // 截图 or 断言
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(this._dt);
        }
    }

    @testCase
    async play_03() {
        // 截图 or 断言
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this._dt + 30);
        }
    }
}