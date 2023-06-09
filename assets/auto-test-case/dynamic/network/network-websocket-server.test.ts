// @ts-ignore
import { PlatformEnum, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@testClass('NetworkWebsocketServer', 'network-websocket-server', [PlatformEnum.WEB_DESKTOP, PlatformEnum.WEB_MOBILE, PlatformEnum.WECHATGAME, PlatformEnum.BYTEDANCE_MINI_GAME,
    PlatformEnum.OPPO_MINI_GAME, PlatformEnum.HUAWEI_QUICK_GAME, PlatformEnum.VIVO_MINI_GAME])
export class NetworkWebsocketServer {
    tickTime: number = 10;

    @testCase
    async start() {
        //waiting
        await screenshot_custom();
    }

    @testCase
    async network() {
        //open
        await screenshot_custom(this.tickTime * 3);

        //binary send binary and value  is opened
        await screenshot_custom(this.tickTime - 5);

        //binary is show
        await screenshot_custom(this.tickTime * 4);

        //websocket closed
        await screenshot_custom(this.tickTime * 50);
    }
}




