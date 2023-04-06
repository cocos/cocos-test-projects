// @ts-ignore
import { runScene, testCase, testClass, sleep } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../dynamic/common/utils'

@runScene('test-atlas-config')
@testClass('TestAtlasConfig')
export class TestAtlasConfig {
    _dt = 170;
    @testCase
    async startPlay() {
        await screenshot_custom(this._dt);
    }
}