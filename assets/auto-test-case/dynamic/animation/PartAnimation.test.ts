// @ts-ignore
import { runScene, sleep, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('PartAnimation')
@testClass('PartAnimation')
export class PartAnimation {
    _dt = 2;

    @testCase
    async startPlay() {

        for (let index = 0; index < 5; index++) {
            // 截图 or 断言
            await screenshot_custom(this._dt);
        };
        await screenshot_custom(this._dt + 10);
    }
}