// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../dynamic/common/utils'

@runScene('rt-read-pixels')
@testClass('RTReadPixels')
export class RTReadPixels {
    _dt = 10;
    @testCase
    async startPlay() {
        await screenshot_custom(this._dt);
    }
}