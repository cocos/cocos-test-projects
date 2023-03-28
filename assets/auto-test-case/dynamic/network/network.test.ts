import { find } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass, sleep, beforeClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { simulateTouchStart, simulateTouchEnd } from '../common/SimulateEvent';
import { screenshot_custom} from '../common/utils';


@runScene('network')
@testClass('Network')
export class Network {
    tickTime: number = 30;

    @testCase
    async start(){
        await screenshot_custom();
    }

    @testCase
    async network(){
        //sen binary websocket instance wasn't ready
        await screenshot_custom(this.tickTime*2 + 10);

        await screenshot_custom(this.tickTime*3);
    }
}




