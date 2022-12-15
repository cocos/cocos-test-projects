// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('coordinate-ui-ui')
@testClass('CoordinateUiUi')
export class CoordinateUiUi {
    _delay = 0.2;
    _dt = 13;

    @testCase
    async index(){
        await screenshot_custom();
    }
    @testCase
    async increase() {
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this._dt + 1);
        };
    }

    @testCase
    async difference() {
        await screenshot_custom(this._dt * 306);
        await screenshot_custom(this._dt * 307);
        await screenshot_custom(this._dt * 308);
    }
}
