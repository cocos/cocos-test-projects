// @ts-ignore
import { testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@testClass('ReflectionProbeBoxProjection', 'reflection-probe-box-projection')
export class ReflectionProbeBoxProjection {
    private df = 290;

    @testCase
    async start() {
      await screenshot_custom(100);
      await screenshot_custom(this.df);
      await screenshot_custom(this.df);
      await screenshot_custom(this.df);
      await screenshot_custom(this.df * 2);
    }
}