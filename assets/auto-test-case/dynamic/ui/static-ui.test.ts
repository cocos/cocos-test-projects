// @ts-ignore
import { runScene, testCase, testClass, sleep } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('static-ui')
@testClass('StaticUi')
export class StaticUi {
    _dt = 85;

    @testCase
    async play() {
        for (let i = 0; i < 13; i++) {
            await screenshot_custom(this._dt);
        }
    }
}