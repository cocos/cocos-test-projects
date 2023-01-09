import { find, view} from 'cc';
// @ts-ignore
import { runScene, testCase, testClass, beforeClass, sleep } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';
import { simulateTouchStart } from '../common/SimulateEvent';
import { SystemEventTest as TouchEventObj } from '../../../cases/event/system-event/touch-event';

@runScene('touch-event')
@testClass('TouchEvent')
export class TouchEvent {
    _dt = 2;
    _delay = 5;
    touchEvent : TouchEventObj | undefined;
    
    @beforeClass
    async initData(){
        //@ts-ignore
        this.touchEvent = find('touch-event').getComponent('SystemEventTest');
        if(!this.touchEvent){
            await sleep(this._delay);
            //@ts-ignore
            this.touchEvent = find('touch-event').getComponent('SystemEventTest');
        }
    }

    @testCase
    async start(){
        await screenshot_custom_by_wait();
    }

    @testCase
    async touchStart(){
        const event = simulateTouchStart(507.1250009536743, 338.6250114440918);
        this.touchEvent?.onTouchStart(event);
        await screenshot_custom_by_wait();
    }

    @testCase
    async touchMoveAndTouchEnd(){
        const eventOne = simulateTouchStart(507.1250009536743, 338.6250114440918);
        this.touchEvent?.onTouchMove(eventOne);
        const eventTwo = simulateTouchStart(534.6250009536743, 259.12500381469727);
        this.touchEvent?.onTouchMove(eventTwo);
        await screenshot_custom_by_wait();
        this.touchEvent!.onTouchEnd(eventOne);
        this.touchEvent!.onTouchEnd(eventTwo);
        await screenshot_custom_by_wait();
    }


    @testCase
    async touchMoveAndTouchCancel(){
        const eventOne = simulateTouchStart(453.37499618530273, 407.3750114440918);
        this.touchEvent?.onTouchMove(eventOne);
        const eventTwo = simulateTouchStart(705.8749961853027, 287.3750114440918);
        this.touchEvent?.onTouchMove(eventTwo);
        this.touchEvent!.onTouchCancel(eventOne)
        this.touchEvent!.onTouchCancel(eventTwo);
        await screenshot_custom_by_wait();
    }

    @testCase
    async basePoint(){
        const event = simulateTouchStart(0, 0);
        this.touchEvent?.onTouchStart(event);
        this.touchEvent?.onTouchEnd(event);
        await screenshot_custom_by_wait();
    }

    @testCase
    async screenSize(){
        const canvasSize = view.getCanvasSize();
        const event = simulateTouchStart(canvasSize.width, canvasSize.height);
        this.touchEvent?.onTouchStart(event);
        this.touchEvent?.onTouchEnd(event);
        await screenshot_custom_by_wait();
    }
}
