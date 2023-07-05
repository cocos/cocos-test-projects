
import { find, Button } from 'cc';
// @ts-ignore
import { testCase, testClass, beforeClass, PlatformEnum } from 'db://automation-framework/runtime/test-framework.mjs';
import { NetworkDownload as NetworkDownloadObj } from '../../../cases/network/NetworkDownload';
import { screenshot_custom } from '../common/utils';
import { UISimulate } from '../common/SimulateEvent';

@testClass('NetworkDownload', 'network-download', [PlatformEnum.WEB_DESKTOP, PlatformEnum.WEB_MOBILE, PlatformEnum.WECHATGAME, PlatformEnum.BYTEDANCE_MINI_GAME, PlatformEnum.OPPO_MINI_GAME, PlatformEnum.HUAWEI_QUICK_GAME, PlatformEnum.VIVO_MINI_GAME])
export class NetworkDownload {
    tickTime: number = 60;
    networkDownloadButton!: Button | null;
    networkDownloadObject!: NetworkDownloadObj | null;

    @beforeClass
    async initData() {
        const buttonNode = find("Canvas/Button")!;
        this.networkDownloadButton = buttonNode.getComponent(Button) as Button;
        this.networkDownloadObject = buttonNode.getComponent("NetworkDownload") as NetworkDownloadObj;
    }

    @testCase
    async start() {
        await screenshot_custom();
    }

    @testCase
    async clickButton() {
        let count = 0;
        let unprogress = true;
        UISimulate.clickButton(this.networkDownloadButton!);
        return new Promise<void>((resolve, reject) => {
            this.networkDownloadObject?.node.on('onProgress', async () => {
                if (unprogress) {
                    unprogress = false;
                    await screenshot_custom();
                }
            });
            this.networkDownloadObject?.node.on('onSuccess', async () => {
                await screenshot_custom();
                resolve();
            });
            this.networkDownloadObject?.node.on('onError', async () => {
                count += 1;
                if (count >= 3) {
                    console.log('NetworkDownload exit after 3 failed attempts.');
                    await screenshot_custom();
                    reject();
                    return;
                } else {
                    console.log('NetworkDownload status: Error, then retry:', count);
                    UISimulate.clickButton(this.networkDownloadButton!);
                }
            });
        });
    }
}