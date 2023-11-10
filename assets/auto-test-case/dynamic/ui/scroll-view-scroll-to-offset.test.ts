
// @ts-ignore
import { beforeClass, testCase, testClass, srandom } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';
import { Button, find, ScrollView } from 'cc';
import { UISimulate } from '../common/SimulateEvent';

@testClass('ScrollViewScrollToOffsetTest', 'scroll-view-scroll-to-offset')
export class ScrollViewScrollToOffsetTest{
    private scrollView!: ScrollView;
    private button!: Button;

    @beforeClass
    async initData() {
        this.scrollView = find('Canvas/ScrollView')?.getComponent(ScrollView)!;
        this.button = find('Canvas/Button')?.getComponent(Button)!;
        srandom('scroll-view-scroll-to-offset');
    }

    @testCase
    async start(){
       await screenshot_custom(1);
    }

    @testCase
    async randomScrollOffset(){
        UISimulate.clickButton(this.button);
        await screenshot_custom(10);
        UISimulate.clickButton(this.button);
        await screenshot_custom(10);
        UISimulate.clickButton(this.button);
        await screenshot_custom(10);
    }

    @testCase
    async scrollToLeft(){
        this.scrollView.scrollToLeft(0.5);
        await screenshot_custom(60);
    }

    @testCase
    async scrollToRigth(){
        this.scrollView.scrollToRight(0.5);
        await screenshot_custom(60);
    }

}