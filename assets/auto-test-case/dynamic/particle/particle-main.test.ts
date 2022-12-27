import { find, Button, Vec3 } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait, mouse_wheel_by_delta } from '../common/utils';

@runScene('particle-main')
@testClass('ParticleMain')
export class ParticleMain {
    _delay = 0.3;
    _dt = 30;

    @testCase
    async startPlay() {
        // begin start to screenshot
        await screenshot_custom_by_wait();
        // take a screenshot after 30 frames, when listing a particle
        await screenshot_custom_by_wait(this._dt*2);
        // take a screenshot at 90 frames, 4 particles in a single row
        await screenshot_custom_by_wait(this._dt*6);
        // take a screenshot at 90 frames, 5 grains in a single row
        await screenshot_custom_by_wait(this._dt*2);

        // button click
        find('Canvas//Button')!.getComponent(Button)?.clickEvents[0].emit([]);
        await screenshot_custom_by_wait();

        // move after the text appears
        //@ts-ignore
        let _camera = find('Camera').getComponent('first-person-camera');
        //@ts-ignore
        _camera._euler = {x: 19.1, y: 2.0, z: 0}
        await screenshot_custom_by_wait(this._dt);

        mouse_wheel_by_delta(-10, _camera);
        await screenshot_custom_by_wait(this._dt);

        mouse_wheel_by_delta(30, _camera);
        await screenshot_custom_by_wait(this._dt);
    }
}