// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

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
        for (let i = 0; i < 11; i++) {
            await screenshot_custom(this._dt);
        }
        await screenshot_custom(this._dt * 2);
    }

}