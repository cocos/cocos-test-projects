import { find, Vec3 } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait, mouse_wheel_by_delta } from '../common/utils';

@testClass('ParticleRotation', 'particle-rotation')
export class ParticleRotation {
    _dt = 15;

    @testCase
    async startPlay() {
        //@ts-ignore
        let _camera = find('Camera').getComponent('first-person-camera');

        await screenshot_custom_by_wait(this._dt);

        mouse_wheel_by_delta(15, _camera);
        await screenshot_custom_by_wait(17);
        
        mouse_wheel_by_delta(-16, _camera);
        await screenshot_custom_by_wait(this._dt);

        //@ts-ignore
        _camera._euler = {x: -5, y: 3, z: 0}
        await screenshot_custom_by_wait(this._dt);
    }

}