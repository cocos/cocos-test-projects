// @ts-ignore
import { captureOneImage, runScene, sleep, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('tween-removeself')
@testClass('TweenRemoveself')
export class TweenRemoveself {
    _dt = 5;

    @testCase
    async startPlay() {
        await screenshot_custom(this._dt);
    }


    @testCase
    async end() {
        await screenshot_custom(this._dt * 100);
    }

}

