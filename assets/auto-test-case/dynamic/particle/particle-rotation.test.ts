import { find } from 'cc';
// @ts-ignore
import { captureOneImage, runScene, sleep, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('particle-rotation')
@testClass('ParticleRotation')
export class ParticleRotation {
    _dt = 10;

    @testCase
    async startPlay() {
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(this._dt);
        };
    }

    @testCase
    async changePosition() {
        //@ts-ignore
        find('Camera').getComponent('first-person-camera')._euler = {x: -8.600000000000007, y: 4.20000000000001, z: 0}
        await screenshot_custom(this._dt);

    }

}