// @ts-ignore
import { captureOneImage, runScene, sleep, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('frame-anim')
@testClass('FrameAnim')
export class FrameAnim {
    _dt = 5;

    @testCase
    async startPlay() {
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this._dt);
        };
    }

}