import { find } from 'cc';
// @ts-ignore
import { testCase, testClass, PlatformEnum, beforeClass, expect } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';
import { NetworkWebSocket } from '../../../cases/network/NetworkWebsocket';

@testClass('NetworkWebsocketServer', 'network-websocket-server', [PlatformEnum.WEB_DESKTOP, PlatformEnum.WEB_MOBILE, PlatformEnum.WECHATGAME, PlatformEnum.BYTEDANCE_MINI_GAME,
    PlatformEnum.OPPO_MINI_GAME, PlatformEnum.HUAWEI_QUICK_GAME, PlatformEnum.VIVO_MINI_GAME])
export class NetworkWebsocketServer {
    private caseScript!: NetworkWebSocket;

    @beforeClass
    async initData() {
        this.caseScript = find('Canvas')?.getComponent(NetworkWebSocket)!;
    }

    @testCase
    async start() {
        await screenshot_custom();
    }

    @testCase
    async network() {
        await screenshot_custom(4*60);
    }

    @testCase
    async close() {
        await screenshot_custom(2*60);
        expect(this.caseScript.wsStatus.string).to.equal('client is closed!');
        expect(this.caseScript.wsServerStatus.string).to.equal('server is closed!');
    }
}
