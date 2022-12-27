import { find, Slider, Vec3 } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait, mouse_wheel_by_delta } from '../common/utils';

@runScene('boxes-unbatched')
@testClass('BoxesUnbatched')
export class BoxesUnbatched {
  _dt = 30;

  @testCase
  async startPlay() {
    await screenshot_custom_by_wait(this._dt);
    // Screenshot of progress bar adjustment
    find('New Canvas/New Slider')!.getComponent(Slider)!.progress = 0;
    //@ts-ignore
    find('Camera')?.getComponent('BatchTester')!.setCount(find('New Canvas/New Slider')!.getComponent(Slider));
    await screenshot_custom_by_wait(this._dt);
    find('New Canvas/New Slider')!.getComponent(Slider)!.progress = 0.3;
    //@ts-ignore
    find('Camera')?.getComponent('BatchTester')!.setCount(find('New Canvas/New Slider')!.getComponent(Slider));
    await screenshot_custom_by_wait(this._dt);
    find('New Canvas/New Slider')!.getComponent(Slider)!.progress = 0.7;
    //@ts-ignore
    find('Camera')?.getComponent('BatchTester')!.setCount(find('New Canvas/New Slider')!.getComponent(Slider));
    await screenshot_custom_by_wait(this._dt);
    find('New Canvas/New Slider')!.getComponent(Slider)!.progress = 1;
    //@ts-ignore
    find('Camera')?.getComponent('BatchTester')!.setCount(find('New Canvas/New Slider')!.getComponent(Slider));
    await screenshot_custom_by_wait(this._dt);

    //@ts-ignore
    let _camera = find('Camera').getComponent('first-person-camera');
    //@ts-ignore
    _camera._euler = {x: -14.50, y: -193.20, z: 0};
    await screenshot_custom_by_wait(this._dt);

    mouse_wheel_by_delta(50, _camera);
    await screenshot_custom_by_wait(this._dt);
    
    mouse_wheel_by_delta(-60, _camera);
    await screenshot_custom_by_wait(this._dt);
  }
}