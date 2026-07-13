// @ts-ignore
import { testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@testClass('ReflectionProbe2', 'reflection-probe2')
export class ReflectionProbe2 {
    _dt = 20;

    @testCase
    async start() {
      await screenshot_custom(this._dt);
    }
}