// @ts-ignore
import { runScene, testCase, testClass, sleep } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../dynamic/common/utils'
import { randomRange, find } from 'cc'

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
        find('Camera').getComponent('first-person-camera')._euler = {
            "x": -22.996478126891027,
            "y": 19.88193054321836,
            "z": -13.218356206589421
        }
        await screenshot_custom(this._dt);

    }
}