// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../dynamic/common/utils';

@runScene('shadowMap')
@testClass('ShadowMap')
export class ShadowMap {
    _dt = 105;

    @testCase
    async font() {
        await screenshot_custom_by_wait(this._dt); 
    }

    @testCase
    async behind() {
        await screenshot_custom_by_wait(this._dt*2-5);
    }
}