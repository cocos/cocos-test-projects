import { director } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';

@runScene('setMipRange')
@testClass('setMipRange')
export class setMipRange{
    _dt = 50;
    _totalFrames = 0;

    @testCase
    async startPlay() {
        await screenshot_custom_by_wait();
        this._totalFrames = director.getTotalFrames();
        for (let i = 0; i < 7; i++) {
            await screenshot_custom_by_wait(this._dt * (i + 1) + this._totalFrames - director.getTotalFrames());
        }
    }
}
