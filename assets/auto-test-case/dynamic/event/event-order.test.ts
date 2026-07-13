import { find } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass, beforeClass, sleep } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';
import { event_order as EventOrderObj } from '../../../cases/event/system-event/event-order';

@runScene('event-order')
@testClass('EventOrder')
export class EventOrder {
    _dt = 2;
    _delay = 5;
    eventOrder : EventOrderObj | undefined;
    
    @beforeClass
    async initData(){
        //@ts-ignore
        this.eventOrder = find('Canvas').getComponent('event_order');
       
        if(!this.eventOrder ){
            await sleep(this._delay);
            //@ts-ignore
            this.eventOrder = find('Canvas').getComponent('event_order');
        }
    }

    @testCase
    async start(){
        await screenshot_custom_by_wait();
    }

    @testCase
    async greenBtn() {
        //@ts-ignore
        this.eventOrder!.touchBtn1();
        await screenshot_custom_by_wait();
    }

    @testCase
    async redBtn() {
        //@ts-ignore
        this.eventOrder!.touchBtn2();
        await screenshot_custom_by_wait();
    }

    @testCase
    async globalBtn() {
        //@ts-ignore
        this.eventOrder!.inputTouch();
        await screenshot_custom_by_wait();
    }

}
