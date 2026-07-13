import { Button, director, find } from 'cc';
// @ts-ignore
import { testCase, testClass, beforeClass, srandom } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';

@testClass('Particle2dNormal', 'particle-2d-normal')
export class Particle2dNormal {
    private df = 180;

    @beforeClass
    async initData() {
        srandom(director.getScene()!.name);
    }

    @testCase
    async startPlay() {
        for (let i=0; i<7; i++) {
            await screenshot_custom_by_wait(this.df);
        }
    }
}