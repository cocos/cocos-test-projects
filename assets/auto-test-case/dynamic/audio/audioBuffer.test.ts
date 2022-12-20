import { clamp, find, Slider, v3 } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';

@runScene('audioBuffer')
@testClass('audioBuffer')
export class audioBuffer {
  _dt = 10;
  @testCase
  async startPlay() {
    await screenshot_custom_by_wait(this._dt);
    find('Canvas/Slider')!.getComponent(Slider)!.progress = 0.2;
    await screenshot_custom_by_wait(this._dt);
    find('Canvas/Slider')!.getComponent(Slider)!.progress = 0.4;
    await screenshot_custom_by_wait(this._dt);
    find('Canvas/Slider')!.getComponent(Slider)!.progress = 0.6;
    await screenshot_custom_by_wait(this._dt);
    find('Canvas/Slider')!.getComponent(Slider)!.progress = 0.8;
    await screenshot_custom_by_wait(this._dt);
    find('Canvas/Slider')!.getComponent(Slider)!.progress = 1;
    await screenshot_custom_by_wait(this._dt);
    //模拟触摸横移事件
    await this.onDragMove(-100);
    await screenshot_custom_by_wait(this._dt*2);
  }

  //模拟触摸横移事件
  onDragMove (deltaX=-1) {
    return new Promise((resolve, reject)=>{
      let selfAudio = find('Canvas')!.getComponent('audioBuffer')!;
      let pos1 = selfAudio.graphics1.node.position;
      let pos2 = selfAudio.graphics2.node.position;
      let posX1 = pos1.x;
      let posX2 = pos2.x;
      posX1 += deltaX;
      posX2 += deltaX;
      selfAudio.graphics1.node.setPosition(v3(posX1, pos1.y, pos1.z));
      selfAudio.graphics2.node.setPosition(v3(posX2, pos2.y, pos2.z));
      resolve("ok");
    });
  }
}