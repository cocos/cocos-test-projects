// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@testClass('planarReflectionProbe', 'planar-reflection-probe')
export class planarReflectionProbe {
    private df = 20;

    @testCase
    async start() {
        await screenshot_custom(this.df);
        await screenshot_custom(this.df);
        await screenshot_custom(this.df);
    }
}