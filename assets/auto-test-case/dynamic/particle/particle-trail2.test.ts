import { director } from 'cc';
// @ts-ignore
import { beforeClass, testCase, testClass, srandom, waitForFrames } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';

@testClass('ParticleTrail2', 'particle-trail2')
export class ParticleTrail2 {
    private df = 60;

    @beforeClass
    async initData() {
        srandom(director.getScene()!.name);
    }

    @testCase
    async startPlay() {
        waitForFrames(30);
        for (let i = 0; i < 5; i++) {
            await screenshot_custom_by_wait(this.df);
        }
    }
}