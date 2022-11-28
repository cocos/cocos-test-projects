// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('tween-delay')
@testClass('TWeenDelay')
export class TWeenDelay {
    _delay = 0.6;
    _dt = 50;

    @testCase
    async index() {
        await screenshot_custom();
    }

    @testCase
    async startPlay() {
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(this._dt);
        }
    }

    @testCase
    async end() {
        await screenshot_custom(this._dt * 5);
    }
}