// @ts-ignore
import { runScene, testCase, testClass, waitForNextFrame } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';

@runScene('particle-trail1')
@testClass('ParticleTrail1')
export class ParticleTrail1 {
    _delay = 0.2;
    _dt = 60;

    @testCase
    async startPlay() {
        await waitForNextFrame()
        await screenshot_custom_by_wait();
        for (let i = 0; i < 5; i++) {
            await screenshot_custom_by_wait(this._dt);
        };
    }
}