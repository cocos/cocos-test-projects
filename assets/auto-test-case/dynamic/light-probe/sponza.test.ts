//@ts-ignore
import { runScene, testCase, testClass, beforeClass, waitForFrames, PlatformEnum } from 'db://automation-framework/runtime/test-framework.mjs';
import { Component, find } from 'cc';
import { PlayerController } from '../../../cases/light-probe/player-controller';
import { screenshot_custom } from '../common/utils';

@runScene("sponza")
@testClass("Sponza", undefined, PlatformEnum.WEB_DESKTOP, PlatformEnum.WEB_MOBILE, PlatformEnum.WECHATGAME, PlatformEnum.BYTEDANCE_MINI_GAME,
    PlatformEnum.OPPO_MINI_GAME, PlatformEnum.HUAWEI_QUICK_GAME, PlatformEnum.VIVO_MINI_GAME)
export class Sponza {
    tickTime: number = 120;

    @testCase
    async start() {
        await screenshot_custom(this.tickTime);
    }
}