// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom ,screenshot_custom_by_wait} from '../common/utils';

@runScene('coordinate-ui-ui')
@testClass('CoordinateUiUi')
export class CoordinateUiUi {
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
        await screenshot_custom_by_wait(this._dt *58);
        await screenshot_custom_by_wait(this._dt);
        await screenshot_custom_by_wait(this._dt);
    }
}
