// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('test-bufferasset')
@testClass('TestBufferasset')
export class TestBufferasset {
    _dt = 10;

    @testCase
    async startPlay() {
        await screenshot_custom(this._dt);
    }
}