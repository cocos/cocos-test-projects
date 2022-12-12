// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('particle-trail1')
@testClass('ParticleTrail1')
export class ParticleTrail1 {
    _delay = 0.2;
    _dt = 60;

    @testCase
    async startPlay() {
        await screenshot_custom();
        for (let i = 0; i < 5; i++) {
            await screenshot_custom(this._dt);
        };
    }
}