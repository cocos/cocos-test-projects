// @ts-ignore
import { runScene, testCase, testClass, sleep } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../dynamic/common/utils'

@runScene('Hexa')
@testClass('Hexa')
export class Hexa {
    _dt = 5;
    _delay = 0.5;

    @testCase
    async startPlay() {
        await sleep(this._delay);
        await screenshot_custom(this._dt);
    }
}