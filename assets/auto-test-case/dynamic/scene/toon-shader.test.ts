import { find, Slider, Vec3 } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';

@runScene('toon-shader')
@testClass('ToonShader')
export class ToonShader {
  _dt = 60;

  @testCase
  async startPlay() {
    await screenshot_custom_by_wait(this._dt);
  }
}