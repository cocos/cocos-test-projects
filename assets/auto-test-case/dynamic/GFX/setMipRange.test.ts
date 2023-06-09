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
        const controlNode = find('control')!;
        const cubemapScript = controlNode.getComponent('setMipRange_cubemap') as setMipRange_cubemap;
        const quadScript = controlNode.getComponent('setMipRange_quad') as setMipRange_quad;

        let num = 6000; //Used for counting frames, up to 1000 frames
        while (!cubemapScript.ready && !quadScript.ready && num > 0) {
            num -= 1;
            await waitForFrames(1);
        }

        await screenshot_custom_by_wait();
        for (let i = 0; i < 7; i++) {
            await screenshot_custom_by_wait(this._dt);
        }
    }
}
