import { find, Button} from 'cc';
// @ts-ignore
import { runScene, testCase, testClass, beforeClass, sleep } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';
import { simulateTouchStart } from '../common/SimulateEvent';
import { eventFirst as EventFirstObj } from '../../../cases/event/event-first/event-first';

@runScene('event-first')
@testClass('EventFirst')
export class EventFirst {
    _dt = 2;
    _delay = 5;
    eventFirst : EventFirstObj | undefined;
    button: Button | undefined;
    
    @beforeClass
    async initData(){
        //@ts-ignore
        this.eventFirst = find('Canvas/Node').getComponent('eventFirst');
         //@ts-ignore
        this.button = find('Canvas/Button').getComponent('cc.Button');
        if(!this.eventFirst || !this.button){
            await sleep(this._delay);
            //@ts-ignore
            this.eventFirst = find('event').getComponent('eventFirst');
            //@ts-ignore
            this.button = find('Canvas/Button').getComponent('cc.Button');
        }
    }

    @testCase
    async start(){
        await screenshot_custom_by_wait();
    }

    @testCase
    async clickButton() {
        //@ts-ignore
        this.button!.clickEvents[0].emit();
        await screenshot_custom_by_wait();
    }

    @testCase
    async touchStart(){
        const event = simulateTouchStart(507.1250009536743, 338.6250114440918);
        this.eventFirst!.onTouchStart(event);
        await screenshot_custom_by_wait();
    }

    @testCase
    async touchMoveAndTouchEnd(){
        const eventOne = simulateTouchStart(507.1250009536743, 338.6250114440918);
        this.eventFirst!.onTouchMove(eventOne);
        const eventTwo = simulateTouchStart(534.6250009536743, 259.12500381469727);
        this.eventFirst!.onTouchMove(eventTwo);
        await screenshot_custom_by_wait();
        this.eventFirst!.onTouchEnd(eventOne);
        this.eventFirst!.onTouchEnd(eventTwo);
        await screenshot_custom_by_wait();
    }


    @testCase
    async touchMoveAndTouchCancel(){
        const eventOne = simulateTouchStart(453.37499618530273, 407.3750114440918);
        this.eventFirst!.onTouchMove(eventOne);
        const eventTwo = simulateTouchStart(705.8749961853027, 287.3750114440918);
        this.eventFirst!.onTouchMove(eventTwo);
        this.eventFirst!.onTouchCancel(eventOne);
        this.eventFirst!.onTouchCancel(eventTwo);
        await screenshot_custom_by_wait();
    }
}
