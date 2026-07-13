import { Button, director, find } from 'cc';
// @ts-ignore
import { testCase, testClass, beforeClass, srandom } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';

@testClass('ParticlesNoiseTest', 'particles-noise-test')
export class ParticlesNoiseTest {
    @beforeClass
    async initData() {
        srandom(director.getScene()!.name);
    }

    @testCase
    async startPlay() {
        await screenshot_custom_by_wait(15);
        await screenshot_custom_by_wait(105);
        await screenshot_custom_by_wait(120);
        await screenshot_custom_by_wait(120);
    }
}