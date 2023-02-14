// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom,screenshot_custom_by_wait } from '../common/utils';

@runScene('fill-sprite')
@testClass('FillSprite')
export class FillSprite {
    _dt = 65;

    @testCase
    async index() {
        await screenshot_custom(2);
    }

    @testCase
    async play() {
        for (let i = 0; i < 10; i++) {
            await screenshot_custom_by_wait(this._dt);
        }
        await screenshot_custom_by_wait(this._dt * 2);
    }

}
