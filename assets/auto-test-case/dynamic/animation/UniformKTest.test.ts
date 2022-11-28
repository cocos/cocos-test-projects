// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';
@runScene('UniformKTest')
@testClass('UniformKTest')
export class UniformKTest {
    _dt = 30;
    _delay = 0.5;
    @testCase
    async startPlay() {
        // 截图 or 断言
        await screenshot_custom(0);
    }

    @testCase
    async uniformKTest() {
        for (let i = 0; i < 4; i++) {
            await screenshot_custom(this._dt);
        };
    }
}