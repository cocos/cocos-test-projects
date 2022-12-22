import { find, Vec3 } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';

@runScene('particle-align')
@testClass('ParticleAlign')
export class ParticleAlign {
  _dt = 30;

  @testCase
  async startPlay() {
    await screenshot_custom_by_wait(this._dt);
    //@ts-ignore
    find('Main Camera').getComponent('first-person-camera')._euler = {x: -11.70, y: -120.70, z: 0};
    await screenshot_custom_by_wait(this._dt);
    await this.onMouseWheel(30);
    await screenshot_custom_by_wait(this._dt);
    
    await this.onMouseWheel(-45);
    await screenshot_custom_by_wait(this._dt);
  }

  
  //zoom
  public onMouseWheel (delta=1) {
    //const delta = -e.getScrollY() * this.moveSpeed * 0.01; // delta is positive when scroll down
    return new Promise((resolve, reject)=>{
      let _self = find('Main Camera')!.getComponent('first-person-camera')!;
      const v3_1 = new Vec3();
      Vec3.transformQuat(v3_1, Vec3.UNIT_Z, _self.node.rotation);
      Vec3.scaleAndAdd(_self._position, _self.node.position, v3_1, delta);
      resolve("ok")
    });
    
  }
}