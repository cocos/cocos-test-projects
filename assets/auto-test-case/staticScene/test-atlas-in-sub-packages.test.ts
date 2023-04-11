// @ts-ignore
import { runScene, testCase, testClass, sleep } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../dynamic/common/utils'

@runScene('test-atlas-in-sub-packages')
@testClass('TestAtlasInSubPackages')
export class TestAtlasInSubPackages {
    _dt = 220;

    @testCase
    async startPlay() {
        await screenshot_custom(this._dt);
    }
}