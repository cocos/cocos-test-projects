// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('planar-reflection-probe')
@testClass('planarReflectionProbe')
export class planarReflectionProbe {
    _dt = 20;

    @testCase
    async start() {
      await screenshot_custom(this._dt);
      await screenshot_custom(this._dt);
      await screenshot_custom(this._dt);
    }
}