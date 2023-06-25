
// @ts-ignore
import { beforeClass, testCase, testClass, waitForFrames } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';
import { find, Node } from 'cc';
import { simulateTouchEnd, simulateTouchMove, simulateTouchStart } from '../common/SimulateEvent';
import { ScrollViewScrollToOffset } from '../../../cases/ui/06.scrollview/scroll-view-scroll-to-offset';

@testClass('ScrollViewScrollToOffsetTest', 'scroll-view-scroll-to-offset')
export class ScrollViewScrollToOffsetTest{
    private caseScript!: ScrollViewScrollToOffset;
    private scrollView!: Node;

    @beforeClass
    async initData() {
        this.caseScript = find('Canvas')?.getComponent(ScrollViewScrollToOffset) as ScrollViewScrollToOffset;
        this.scrollView = find('Canvas/ScrollView')!;
    }

    @testCase
    async start(){
       await screenshot_custom(1);
    }

    @testCase
    async randomScrollOffset(){
        this.caseScript.randomScrollOffset(null, 0.71);
        await screenshot_custom(1);
        this.caseScript.randomScrollOffset(null, 0.27);
        await screenshot_custom(1);
        this.caseScript.randomScrollOffset(null, 0.43);
        await screenshot_custom(1);
    }

    @testCase
    async scrollToLeft(){
        simulateTouchStart(0, 0, this.scrollView);
        await waitForFrames(1);
        simulateTouchEnd(this.scrollView, 100, 0);
        await screenshot_custom(120);
    }

    @testCase
    async scrollToRigth(){
        simulateTouchStart(0, 0, this.scrollView);
        await waitForFrames(1);
        simulateTouchEnd(this.scrollView, -100, 0);
        await screenshot_custom(120);
    }

}