// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('EasingMethods')
@testClass('EasingMethods')
export class EasingMethods {
    _dt = 18;
    @testCase
    async startPlay() {
        for (let index = 0; index < 3; index++) {
            await screenshot_custom(this._dt);
        };
        await screenshot_custom(this._dt-13);
        await screenshot_custom(this._dt-14);
    }
}