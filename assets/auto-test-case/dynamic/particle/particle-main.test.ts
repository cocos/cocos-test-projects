// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('particle-main')
// @testClass('ParticleMain')
export class ParticleMain {
    _delay = 0.3;
    _dt = 30;

    @testCase
    async startPlay() {
        for (let i = 0; i < 8; i++) {
            await screenshot_custom(this._dt);
        };
    }

}