// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';

@runScene('frame-anim')
@testClass('FrameAnim')
export class FrameAnim {
    _dt = 5;

    @testCase
    async startPlay() {
        for (let i = 0; i < 3; i++) {
            await screenshot_custom_by_wait(this._dt);
        };
    }

}