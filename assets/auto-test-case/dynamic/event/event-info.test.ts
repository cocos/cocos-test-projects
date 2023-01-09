import { find, EventMouse, NodeEventType} from 'cc';
// @ts-ignore
import { runScene, testCase, testClass, beforeClass, sleep } from 'db://automation-framework/runtime/test-framework.mjs';
import { EventInfo as EventInfoObj  } from '../../../cases/event/event-info';
import { screenshot_custom_by_wait } from '../common/utils';
import { simulateTouchStart } from '../common/SimulateEvent';

@runScene('event-info')
@testClass('EventInfo')
export class EventInfo {
    _dt = 2;
    _delay = 5;
    eventInfo : EventInfoObj | undefined;
    mouse : EventMouse | undefined;
    
    @beforeClass
    async initData(){
        //@ts-ignore
        this.eventInfo = find('event').getComponent('EventInfo');
        if(this.eventInfo){
            await sleep(this._delay);
            //@ts-ignore
            this.eventInfo = find('event').getComponent('EventInfo');
        }else{
            console.error('event info object is not exist!');
        }
        this.mouse = new EventMouse(NodeEventType.MOUSE_MOVE);
    }

    @testCase
    async touchStart() {
       const event= simulateTouchStart(545.87, 289.63);
        //@ts-ignore
        this.eventInfo?._touchStart(event);
        await screenshot_custom_by_wait();
    }

    @testCase
    async touchMove() {
        const event= simulateTouchStart(559.375, 420.12500762939453);
        //@ts-ignore
        this.eventInfo?._touchMove(event);
        await screenshot_custom_by_wait();
        this.eventInfo?._touchEnd();
        await screenshot_custom_by_wait();
    }


    @testCase
    async mouseMove(){
        this.mouse?.setLocation(350,450); 
        this.eventInfo?._mouseMove(this.mouse!);
        await screenshot_custom_by_wait();
        this.mouse!.setLocation(0,0);
        this.eventInfo?._mouseUp();
        await screenshot_custom_by_wait(); 
    }
}
