import { find, Vec3 } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass, sleep } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait, mouse_wheel_by_delta } from '../common/utils';

@runScene('shadowCSM')
@testClass('ShadowCSM')
export class ShadowCSM {
  _dt = 60;

  @testCase
  async startPlay() {
    //@ts-ignore
    let _camera = find('Main Camera').getComponent('first-person-camera');
    await screenshot_custom_by_wait(this._dt);
    
    mouse_wheel_by_delta(20, _camera);
    await sleep(0.5);
    await screenshot_custom_by_wait(this._dt);
    
    mouse_wheel_by_delta(-22, _camera);
    await sleep(0.5);
    await screenshot_custom_by_wait(this._dt);
    //@ts-ignore
    _camera._euler = {x:18, y: -20, z: 0};
    await sleep(0.5);
    await screenshot_custom_by_wait(this._dt);
  }
}