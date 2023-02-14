import { find} from 'cc';
// @ts-ignore
import { runScene, testCase, testClass, beforeClass, sleep, PlatformEnum } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';
import { simulateMultiTouch } from '../common/SimulateEvent';
import { MultiTouchCtrl } from '../../../cases/event/multiTouch/MultiTouchCtrl';

@runScene('multiTouch')
@testClass('MultiTouch', undefined, [PlatformEnum.WEB_DESKTOP, PlatformEnum.MAC, PlatformEnum.WINDOWS])
export class MultiTouch {
    _dt = 2;
    _delay = 5;
    multiTouchCtrl : MultiTouchCtrl | undefined;
    isChecked: Boolean | undefined = true;
    
    @beforeClass
    async initData(){
        //@ts-ignore
        this.multiTouchCtrl = find('MultiCtrl').getComponent('MultiTouchCtrl');
         //@ts-ignore
        this.multiTouchCtrl.toggle.isChecked = this.isChecked;
        if(!this.multiTouchCtrl){
            await sleep(this._delay);
            //@ts-ignore
            this.multiTouchCtrl = find('MultiCtrl').getComponent('MultiTouchCtrl');
        }
    }

    @testCase
    async start(){
        await screenshot_custom_by_wait();
    }

    @testCase
    async onTouchSmall() {
        const event = simulateMultiTouch(116.12500190734863, 275.12500762939453, 50, 100);
        this.multiTouchCtrl!.onTouchMove(event);
        await screenshot_custom_by_wait();
    }

    @testCase
    async onTouchBig() {
        const event = simulateMultiTouch(116.12500190734863, 275.12500762939453, 616.12500190734863, 475.12500762939453);
        this.multiTouchCtrl!.onTouchMove(event);
        await screenshot_custom_by_wait();
    }

    @testCase
    async isCheckedFalse() {
        this.multiTouchCtrl!.toggle.isChecked = false;
        const event = simulateMultiTouch(200.12500190734863, 375.12500762939453, 616.12500190734863, 475.12500762939453);
        this.multiTouchCtrl!.onTouchMove(event);
        await screenshot_custom_by_wait();
    }
}
