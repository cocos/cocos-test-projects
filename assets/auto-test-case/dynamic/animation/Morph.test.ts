// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('Morph')
@testClass('Morph')
export class Morph {
    _dt = 50;
    @testCase
    async startPlay() {
        for (let i = 0; i < 5; i++) {
            // 截图 or 断言
            await screenshot_custom(this._dt);
        }
    }
}