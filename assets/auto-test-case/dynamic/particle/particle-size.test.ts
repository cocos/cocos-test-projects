import { find, director } from 'cc';
// @ts-ignore
import { beforeClass, testCase, testClass, srandom } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@testClass('ParticleSize', 'particle-size')
export class ParticleSize {
    _dt = 6;

    @beforeClass
    async initData() {
        srandom(director.getScene()!.name);
    }

    @testCase
    async startPlay() {
        await screenshot_custom(this._dt);
        await screenshot_custom(this._dt*15);
        await screenshot_custom(this._dt*30);

        // screenshot after moving
        //@ts-ignore
        find('Camera').getComponent('first-person-camera')._euler = {x: -10.600000000000007, y: 5.20000000000001, z: 0}
        await screenshot_custom(this._dt*5);
        /**
        for (let i = 0; i < 5; i++) {
            await screenshot_custom(this._dt);
        };
         */
    }

}