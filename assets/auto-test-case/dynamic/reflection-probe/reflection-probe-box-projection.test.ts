// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('reflection-probe-box-projection')
@testClass('ReflectionProbeBoxProjection')
export class ReflectionProbeBoxProjection {
    _dt = 60;

    @testCase
    async start() {
      await screenshot_custom(this._dt);
      await screenshot_custom(this._dt*4);
      await screenshot_custom(this._dt*6);
      await screenshot_custom(this._dt*10);
    }
}