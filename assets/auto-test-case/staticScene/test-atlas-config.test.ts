// @ts-ignore
import { runScene, testCase, testClass, sleep } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../dynamic/common/utils'

@runScene('test-atlas-config')
@testClass('TestAtlasConfig')
export class TestAtlasConfig {
    _dt = 50;
    _delay = 2;
    @testCase
    async startPlay() {
        await sleep(this._delay)
        await screenshot_custom(this._dt);
    }
}