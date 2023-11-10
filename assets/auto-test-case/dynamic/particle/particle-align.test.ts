import { director, find } from 'cc';
// @ts-ignore
import { beforeClass, testCase, testClass, srandom } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait, mouse_wheel_by_delta } from '../common/utils';

@testClass('ParticleAlign', 'particle-align')
export class ParticleAlign {
  _dt = 30;

  @beforeClass
  async initData() {
      srandom(director.getScene()!.name);
  }

  @testCase
  async startPlay() {
    //@ts-ignore
    let _camera = find('Main Camera').getComponent('first-person-camera');
    await screenshot_custom_by_wait(this._dt);
    //@ts-ignore
    _camera._euler = {x: -11.70, y: -120.70, z: 0};
    await screenshot_custom_by_wait(this._dt);
    mouse_wheel_by_delta(30, _camera);
    await screenshot_custom_by_wait(this._dt);
    
    mouse_wheel_by_delta(-45, _camera);
    await screenshot_custom_by_wait(this._dt);
  }
}