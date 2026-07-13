// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';

@runScene('particle-texture-animation')
@testClass('ParticleTextureAnimation')
export class ParticleTextureAnimation {
    _delay = 0.2;
    _dt = 23;

    @testCase
    async startPlay() {
        for (let i = 0; i < 5; i++) {
            await screenshot_custom_by_wait(this._dt);
        };
    }
}