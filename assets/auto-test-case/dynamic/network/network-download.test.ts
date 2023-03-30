
import { Component, find } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass, sleep, beforeClass, PlatformEnum } from 'db://automation-framework/runtime/test-framework.mjs';
import { NetworkDownload as NetworkDownloadObj } from '../../../cases/network/NetworkDownload';
import { simulateTouchStart, simulateTouchEnd } from '../common/SimulateEvent';
import { screenshot_custom } from '../common/utils';

@runScene('network-download')
@testClass('NetworkDownload', undefined, PlatformEnum.WEB_DESKTOP, PlatformEnum.WEB_MOBILE, PlatformEnum.WECHATGAME, PlatformEnum.BYTEDANCE_MINI_GAME,
PlatformEnum.OPPO_MINI_GAME,PlatformEnum.HUAWEI_QUICK_GAME,PlatformEnum.VIVO_MINI_GAME)
export class NetworkDownload {
    tickTime: number = 30;

    networkDownload!: NetworkDownloadObj | null | Component;
    @beforeClass
    async initData() {
        this.networkDownload = find("Canvas/Button")!.getComponent("cc.Button")
    }

    @testCase
    async start() {
        await screenshot_custom();
    }

    @testCase
    async clickButton() {
        this.networkDownload!.clickEvents[0].emit([]);
        //TODO:begin capture progress
        await screenshot_custom(this.tickTime);
        //TODO:capture to progress
        await screenshot_custom(this.tickTime * 2);
        // //TODO:capture to finish
        // await screenshot_custom(this.tickTime * 10);
    }
}





