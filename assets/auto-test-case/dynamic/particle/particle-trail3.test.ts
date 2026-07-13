import { director } from 'cc';
// @ts-ignore
import { beforeClass, testCase, testClass, srandom } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';

@testClass('ParticleTrail3', 'particle-trail3')
export class ParticleTrail3 {
    private df = 60;

    @beforeClass
    async initData() {
        srandom(director.getScene()!.name);
    }

    @testCase
    async startPlay() {
        for (let i = 0; i < 5; i++) {
            await screenshot_custom_by_wait(this.df);
        }
    }
}