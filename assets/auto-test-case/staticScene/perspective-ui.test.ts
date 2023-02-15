import { find } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass, sleep } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../dynamic/common/utils';

@runScene('perspective-ui')
//@testClass('Perspectiveui')
export class Perspectiveui {
    _dt = 10;

    @testCase
    async start(){
        await sleep(0.5)
        await screenshot_custom(this._dt);
    }
}