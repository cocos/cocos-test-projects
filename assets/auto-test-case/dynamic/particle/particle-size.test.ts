import { find } from 'cc';
// @ts-ignore
import { captureOneImage, runScene, sleep, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('particle-size')
@testClass('ParticleSize')
export class ParticleSize {
    _dt = 6;
    @testCase
    async startPlay() {
        await screenshot_custom();
        await screenshot_custom(this._dt*20);

        // screenshot after moving
        //@ts-ignore
        find('Camera').getComponent('first-person-camera')._euler = {x: -10.600000000000007, y: 5.20000000000001, z: 0}
        await screenshot_custom();
        await screenshot_custom(this._dt*10);
        /**
        for (let i = 0; i < 5; i++) {
            await screenshot_custom(this._dt);
        };
         */
    }

}