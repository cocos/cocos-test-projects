// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../dynamic/common/utils';

@runScene('shield-node')
// @testClass('ShieldNode')
export class ShieldNode {
    _dt = 10;

    @testCase
    async startPlay() {
        await screenshot_custom(this._dt)
    }
}