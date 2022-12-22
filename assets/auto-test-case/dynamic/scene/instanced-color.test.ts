import { find, Slider, Vec3 } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';

@runScene('instanced-color')
@testClass('InstancedColor')
export class InstancedColor {
  _dt = 30;

  @testCase
  async startPlay() {
    await screenshot_custom_by_wait(this._dt);
    // Screenshot of progress bar adjustment
    find('New Canvas/New Slider')!.getComponent(Slider)!.progress = 0;
    find('Camera')?.getComponent('BatchTester')!.setCount(find('New Canvas/New Slider')!.getComponent(Slider));
    await screenshot_custom_by_wait(this._dt);
    find('New Canvas/New Slider')!.getComponent(Slider)!.progress = 0.3;
    find('Camera')?.getComponent('BatchTester')!.setCount(find('New Canvas/New Slider')!.getComponent(Slider));
    await screenshot_custom_by_wait(this._dt);
    find('New Canvas/New Slider')!.getComponent(Slider)!.progress = 0.7;
    find('Camera')?.getComponent('BatchTester')!.setCount(find('New Canvas/New Slider')!.getComponent(Slider));
    await screenshot_custom_by_wait(this._dt);
    find('New Canvas/New Slider')!.getComponent(Slider)!.progress = 1;
    find('Camera')?.getComponent('BatchTester')!.setCount(find('New Canvas/New Slider')!.getComponent(Slider));
    await screenshot_custom_by_wait(this._dt);

    //@ts-ignore
    find('Camera').getComponent('first-person-camera')._euler = {x: -14.50, y: -193.20, z: 0};
    await screenshot_custom_by_wait(this._dt);

    await this.onMouseWheel(50);
    await screenshot_custom_by_wait(this._dt);
    
    await this.onMouseWheel(-60);
    await screenshot_custom_by_wait(this._dt);
  }

  
  // zoom
  public onMouseWheel (delta=1) {
    //const delta = -e.getScrollY() * this.moveSpeed * 0.01; // delta is positive when scroll down
    return new Promise((resolve, reject)=>{
      let _self = find('Camera')!.getComponent('first-person-camera')!;
      const v3_1 = new Vec3();
      Vec3.transformQuat(v3_1, Vec3.UNIT_Z, _self.node.rotation);
      Vec3.scaleAndAdd(_self._position, _self.node.position, v3_1, delta);
      resolve("ok")
    });
    
  }
}