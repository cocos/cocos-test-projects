import { director, find } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass, waitForFrames, PlatformEnum } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';
import { setMipRange_cubemap } from '../../../cases/GFX/setMipRange/setMipRange-cube';
import { setMipRange_quad } from '../../../cases/GFX/setMipRange/setMipRange-quad';

@testClass('setMipRange', 'setMipRange', [PlatformEnum.WEB_MOBILE, PlatformEnum.HUAWEI_QUICK_GAME, PlatformEnum.OPPO_MINI_GAME])
export class setMipRange {
    _dt = 50;

    @testCase
    async startPlay() {
        await waitForFrames(5);
        await screenshot_custom_by_wait();
        await screenshot_custom_by_wait(this._dt);
        for (let i = 0; i < 3; i++) {
            await screenshot_custom_by_wait(this._dt*2);
        }
    }
}
