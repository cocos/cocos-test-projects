// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('tween')
@testClass('Tween')
export class Tween {
    _delay = 0.3;
    _dt = 30;

    @testCase
    async index() {
        await screenshot_custom();
    }


    @testCase
    async play() {
        for (let i = 0; i < 5; i++) {
            await screenshot_custom(this._dt);
        }
    }


    @testCase
    async end() {
        await screenshot_custom(this._dt + 100);
    }

}

