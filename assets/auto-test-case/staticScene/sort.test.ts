// @ts-ignore
import { runScene, testCase, testClass, sleep } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../dynamic/common/utils'
import { find } from 'cc'

@runScene('sort')
@testClass('Sort')
export class Sort {
    _dt = 10;
    _delay = 0.5;
    @testCase
    async startPlay() {
        await sleep(this._delay);
        await screenshot_custom(this._dt);
    }

    @testCase
    async changePosition() {
        await sleep(this._delay);
        //@ts-ignore
        find('Camera').getComponent('first-person-camera')._euler = {x: -8.600000000000007, y: 4.20000000000001, z: 0}
        await screenshot_custom(this._dt);
    }
}