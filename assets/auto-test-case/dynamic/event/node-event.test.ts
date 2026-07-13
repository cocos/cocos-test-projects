import { find } from 'cc';
// @ts-ignore
import { captureOneImage, runScene, sleep, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('node-event')
@testClass('NodeEvent')
export class NodeEvent {
    _dt = 2;
    _delay = 0.5;

    @testCase
    async startPlay() {
        await screenshot_custom(this._dt);
    }

    @testCase
    async Area_A() {
        await sleep(this._delay);
        // @ts-ignore
        find('Canvas/area A').getComponent('NodeEvent').click();
        // await sleep(this._delay);
        await screenshot_custom(this._dt);
    }

    @testCase
    async Area_B() {
        // @ts-ignore
        find('Canvas/area B').getComponent('NodeEvent').click();
        await screenshot_custom(this._dt);
    }

    @testCase
    async Area_C() {
        // @ts-ignore
        find('Canvas/area C').getComponent('NodeEvent').click();
        await screenshot_custom(this._dt);
    }

    @testCase
    async Area_D() {
        // @ts-ignore
        find('Canvas/area D').getComponent('NodeEvent').click();
        await screenshot_custom(this._dt);
    }
}
