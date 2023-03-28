//@ts-ignore
import { runScene, testCase, testClass, beforeClass, waitForFrames, PlatformEnum } from 'db://automation-framework/runtime/test-framework.mjs';
import { Component, find } from 'cc';
import { PlayerController } from '../../../cases/light-probe/player-controller';
import { screenshot_custom } from '../common/utils';

@runScene("sponza")
@testClass("Sponza", undefined, PlatformEnum.WINDOWS, PlatformEnum.IOS, PlatformEnum.MAC, PlatformEnum.ANDROID)
export class Sponza {
    tickTime: number = 120;

    @testCase
    async start() {
        await screenshot_custom(this.tickTime);
    }
}