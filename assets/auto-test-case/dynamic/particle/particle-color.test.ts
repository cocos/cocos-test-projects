import { find, Node } from 'cc';
// @ts-ignore
import { testCase, testClass, beforeClass, srandom } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait, mouse_wheel_by_delta } from '../common/utils';
import { FirstPersonCamera } from '../../../shared-res/first-person-camera';

@testClass('ParticleColor', 'particle-color')
export class ParticleColor {
  private camera!: Node;
  private df = 30;

  @beforeClass
  async initData() {
      this.camera = find('Camera')!;
      this.camera.getComponent(FirstPersonCamera)!.enabled = false;
      srandom('particle-color');
  }

  @testCase
  async startPlay() {
      for (let i=0; i<6; i++) {
          await screenshot_custom_by_wait(this.df);
      }
  }
}