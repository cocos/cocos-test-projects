// @ts-ignore
import { testCase, testClass, beforeClass, srandom } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';
import { director } from 'cc';

@testClass('ParticleGravity', 'particle-gravity')
export class ParticleGravity {
    private df = 60;

    @beforeClass
    async initData() {
        srandom(director.getScene()!.name);
    }

    @testCase
    async startPlay() {
        for (let i=0; i<4; i++) {
            await screenshot_custom_by_wait(this.df);
        }
    }
}