// @ts-ignore
import { captureOneImage, runScene, sleep, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('particle-size')
// @testClass('ParticleSize')
export class ParticleSize {
    _dt = 6;
    @testCase
    async startPlay() {
        for (let i = 0; i < 5; i++) {
            await screenshot_custom(this._dt);
        };
    }

}