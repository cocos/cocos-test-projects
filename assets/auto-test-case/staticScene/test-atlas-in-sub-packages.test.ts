// @ts-ignore
import { runScene, testCase, testClass, sleep } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../dynamic/common/utils'

@runScene('test-atlas-in-sub-packages')
@testClass('TestAtlasInSubPackages')
export class TestAtlasInSubPackages {
    _dt = 100;
    _delay = 2;

    @testCase
    async startPlay() {
        await sleep(this._delay)
        await screenshot_custom(this._dt);
    }
}