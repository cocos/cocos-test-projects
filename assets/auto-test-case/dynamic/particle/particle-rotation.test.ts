import { find, Vec3 } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait, mouse_wheel_by_delta } from '../common/utils';

@runScene('particle-rotation')
@testClass('ParticleRotation')
export class ParticleRotation {
    _dt = 15;

    @testCase
    async startPlay() {
        //@ts-ignore
        let _camera = find('Camera').getComponent('first-person-camera');

        await screenshot_custom_by_wait(45);
        mouse_wheel_by_delta(15, _camera);
        await screenshot_custom_by_wait(45);
        mouse_wheel_by_delta(-16, _camera);
        await screenshot_custom_by_wait(45);
        //@ts-ignore
        _camera._euler = {x: -18.600000000000007, y: 3.20000000000001, z: 0}
        await screenshot_custom_by_wait(15);
    }

    //@testCase
    //async changePosition() {
        //@ts-ignore
    //    find('Camera').getComponent('first-person-camera')._euler = {x: -18.600000000000007, y: 4.20000000000001, z: 0}
    //    await screenshot_custom(this._dt);
    //}

}