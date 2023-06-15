import { find } from 'cc';
// @ts-ignore
import { testCase, testClass, beforeClass, PlatformEnum } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';
import { simulateMultiTouch } from '../common/SimulateEvent';
import { MultiTouchCtrl } from '../../../cases/event/multiTouch/MultiTouchCtrl';

@testClass('MultiTouch', 'multiTouch', [PlatformEnum.WEB_DESKTOP, PlatformEnum.MAC, PlatformEnum.WINDOWS])
export class MultiTouch {
    multiTouchCtrl!: MultiTouchCtrl;
    
    @beforeClass
    async initData(){
        this.multiTouchCtrl = find('MultiCtrl')!.getComponent('MultiTouchCtrl') as MultiTouchCtrl;
        this.multiTouchCtrl.toggle.isChecked = true;
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
