// @ts-ignore
import { captureOneImage, runScene, sleep, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('lighting')
@testClass('Lighting')
export class Lighting {
    _dt = 180;
    _delay = 0.1;

    @testCase
    async index() {
        await screenshot_custom();
    }

    @testCase
    async play() {
        // 截图 or 断言
        for (let i = 0; i < 7; i++) {
            await screenshot_custom(this._dt);
        }
    }
}