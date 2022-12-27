import { find, Vec3 } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait, mouse_wheel_by_delta } from '../common/utils';

@runScene('particle-color')
@testClass('ParticleColor')
export class ParticleColor {
  _dt = 19;

  @testCase
  async startPlay() {
    //@ts-ignore
    let _camera = find('Camera').getComponent('first-person-camera');
    await screenshot_custom_by_wait(this._dt);
    await screenshot_custom_by_wait(this._dt);
    await screenshot_custom_by_wait(this._dt);
    //@ts-ignore
    _camera._euler = {x: 6.0, y: -5.5, z: 0};
    await screenshot_custom_by_wait(this._dt);
    mouse_wheel_by_delta(20, _camera);
    await screenshot_custom_by_wait(this._dt);
    
    mouse_wheel_by_delta(-22, _camera);
    await screenshot_custom_by_wait(this._dt);
  }
}