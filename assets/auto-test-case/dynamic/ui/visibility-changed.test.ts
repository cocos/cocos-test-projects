// @ts-ignore
import { game } from 'cc';
import { captureOneImage, runScene, sleep, testCase, testClass, beforeCase, afterCase } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('visibility-changed')
@testClass('VisibilityChanged')
export class VisibilityChanged {
    _dt = 5;

    @testCase
    async startPlay() {
        await screenshot_custom();
        await screenshot_custom(this._dt * 12);
    }
}