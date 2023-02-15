// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';

@runScene('particle-trail3')
@testClass('ParticleTrail3')
export class ParticleTrail3 {
    _dt = 18;

    @testCase
    async startPlay() {
        for (let i = 0; i < 4; i++) {
            await screenshot_custom_by_wait(this._dt);
        };
    }
}