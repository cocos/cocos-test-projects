// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('particle-trail3')
@testClass('ParticleTrail3')
export class ParticleTrail3 {
    _dt = 15;

    @testCase
    async startPlay() {
        await screenshot_custom();
        for (let i = 0; i < 4; i++) {
            await screenshot_custom(this._dt);
        };
    }
}