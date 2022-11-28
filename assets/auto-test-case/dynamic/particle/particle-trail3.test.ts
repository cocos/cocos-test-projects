// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('particle-trail3')
// @testClass('ParticleTrail3')
export class ParticleTrail3 {
    _delay = 0.2;
    _dt = 10;

    @testCase
    async startPlay() {
        for (let i = 0; i < 5; i++) {
            await screenshot_custom(this._dt);
        };
    }
}