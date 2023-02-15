// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';

@runScene('particle-trail2')
@testClass('ParticleTrail2')
export class ParticleTrail2 {
    _dt = 60;

    @testCase
    async startPlay() {
        await screenshot_custom_by_wait(75);
        for (let i = 0; i < 4; i++) {
            await screenshot_custom_by_wait(this._dt);
        };
    }
}