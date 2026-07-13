// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('coordinate-ui-3d')
@testClass('CoordinateUi3d')
export class CoordinateUi3d {
    _delay = 0.2;
    _dt = 30;

    @testCase
    async startPlay() {
        for (let i = 0; i < 5; i++) {
            await screenshot_custom(this._dt);
        };
    }
}