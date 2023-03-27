// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('reflection-probe')
@testClass('reflectionProbe')
export class reflectionProbe {
    _dt = 60;

    @testCase
    async start() {
      await screenshot_custom(this._dt);
    }
}