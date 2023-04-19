
import { Component, find } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass, sleep, beforeClass, PlatformEnum, expect } from 'db://automation-framework/runtime/test-framework.mjs';
import { NetworkDownload as NetworkDownloadObj } from '../../../cases/network/NetworkDownload';
import { screenshot_custom } from '../common/utils';

@runScene('network-download')
@testClass('NetworkDownload', undefined, [PlatformEnum.WEB_DESKTOP, PlatformEnum.WEB_MOBILE, PlatformEnum.WECHATGAME, PlatformEnum.BYTEDANCE_MINI_GAME,
    PlatformEnum.OPPO_MINI_GAME, PlatformEnum.HUAWEI_QUICK_GAME, PlatformEnum.VIVO_MINI_GAME])
export class NetworkDownload {
    tickTime: number = 30;

    networkDownloadComponent!: null | Component;
    networkDownload!: NetworkDownloadObj | null | Component;
    networkResultArray: String[] = [];
    totalBytesReceived!: number;
    progress!: number;
    @beforeClass
    async initData() {
        this.networkDownloadComponent = find("Canvas/Button")!.getComponent("cc.Button");
        this.networkDownload = find("Canvas/Button")!.getComponent("NetworkDownload");
        this.networkResultArray = this.networkDownload!.text.string.split("==>");
        this.totalBytesReceived = Number(this.networkResultArray[0]);
        this.progress = Number(this.networkResultArray[0].substring(0, this.networkResultArray[0].length - 1));
    }

    @testCase
    async start() {
        await screenshot_custom();
    }

    @testCase
    async clickButton() {
        this.networkDownloadComponent!.clickEvents[0].emit([]);
        console.log("this.totalBytesReceived",this.totalBytesReceived);
        console.log("this.progress",this.progress);
        if (this.networkDownload!.status.string === "status: Downloading") {
            expect(this.totalBytesReceived).to.be.within(1, 18161054);
            expect(this.progress).to.be.within(1, 99);
        } else if (this.networkDownload!.status.string === "status: Success") {
            expect(this.totalBytesReceived).to.equal(18161055);
            expect(this.progress).to.equal(100);
        } else if (this.networkDownload!.status.string === "status: Not start") {
            expect(this.networkDownload!.status.string).to.equal("status: Not start");
        } else if (this.networkDownload!.status.string === "status: Error") {
            expect(this.networkDownload!.status.string).to.equal("status: Error");
        }

        //TODO:begin capture progress
        // await screenshot_custom(this.tickTime);
        //TODO:capture to progress
        // await screenshot_custom(this.tickTime * 2);
        // //TODO:capture to finish
        // await screenshot_custom(this.tickTime * 10);
    }
}