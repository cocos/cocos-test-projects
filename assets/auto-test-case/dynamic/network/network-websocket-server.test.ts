import { find } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass, sleep, beforeClass,PlatformEnum } from 'db://automation-framework/runtime/test-framework.mjs';
import { simulateTouchStart, simulateTouchEnd } from '../common/SimulateEvent';
import { screenshot_custom} from '../common/utils';


@runScene('network-websocket-server')
@testClass('NetworkWebsocketServer',undefined, PlatformEnum.WINDOWS, PlatformEnum.IOS, PlatformEnum.MAC, PlatformEnum.ANDROID)
export class NetworkWebsocketServer {
    tickTime: number = 10;

    @testCase
    async start(){
        //waiting
        await screenshot_custom();
    }

    @testCase
    async network(){
        //open
        await screenshot_custom(this.tickTime*3);

        //binary send binary and value  is opened
        await screenshot_custom(this.tickTime-5);

        //binary is show
        await screenshot_custom(this.tickTime*4);

        //websocket closed
        await screenshot_custom(this.tickTime*50);
    }
}




