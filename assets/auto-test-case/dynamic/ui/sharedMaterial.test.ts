// @ts-ignore
import { captureOneImage, runScene, sleep, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('sharedMaterial')
@testClass('SharedMaterial')
export class SharedMaterial {
    _dt = 70;

    @testCase
    async startPlay() {
        for (let i = 0; i < 6; i++) {
            await screenshot_custom(this._dt);
        };
    }

}