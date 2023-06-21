import { Label, Node, find } from 'cc';
// @ts-ignore
import { beforeClass, testCase, testClass, waitForFrames, expect } from 'db://automation-framework/runtime/test-framework.mjs';
import { simulateTouchStart, simulateTouchMove, simulateTouchEnd } from '../common/SimulateEvent';
import { screenshot_custom } from '../common/utils';

@testClass('ScrollViewBounceBack', 'scroll-view-bounce-back')
export class ScrollViewBounceBack {
    private scrollView!: Node;
    private label!: Label;

    @beforeClass
    async initData() {
        this.scrollView = find('Canvas/ScrollView')!;
        this.label = find('Canvas/LogLabel')?.getComponent(Label)!;
    }

    @testCase
    async startPlay() {
        await screenshot_custom(60);
    }

    @testCase
    async scrolling() {
        // ScrollToRight
        simulateTouchStart(0, 0, this.scrollView);
        simulateTouchMove(this.scrollView, -10, 0);
        simulateTouchEnd(this.scrollView, -10, 0);
        await screenshot_custom(150);

        let str = this.label.string;
        await screenshot_custom(30);
        expect(this.label.string).to.equal(str);


        // ScrollToCenter
        // Same simulated touch parameters, the scrolling results are not the same, why?
        simulateTouchStart(0, 0, this.scrollView);
        simulateTouchMove(this.scrollView, 1, 0);
        simulateTouchEnd(this.scrollView, 1, 0);
        await screenshot_custom(240);

        str = this.label.string;
        await screenshot_custom(30);
        expect(this.label.string).to.equal(str);

        // ScrollToLeft
        simulateTouchStart(0, 0, this.scrollView);
        simulateTouchMove(this.scrollView, 10, 0);
        simulateTouchEnd(this.scrollView, 10, 0);
        await screenshot_custom(120);

        str = this.label.string;
        await screenshot_custom(30);
        expect(this.label.string).to.equal(str);
    }
}