import { Button, director, find } from 'cc';
// @ts-ignore
import { testCase, testClass, beforeClass, srandom } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';

@testClass('ParticleCompare', 'particle-compare')
export class ParticleCompare {
    @beforeClass
    async initData() {
        srandom(director.getScene()!.name);
    }

    @testCase
    async startPlay() {
        await screenshot_custom_by_wait(20);
        await screenshot_custom_by_wait(40);
        await screenshot_custom_by_wait(68);
        await screenshot_custom_by_wait(150);
        await screenshot_custom_by_wait(100);
    }
}