import { Label, Node, ScrollView, find } from 'cc';
// @ts-ignore
import { beforeClass, expect, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@testClass('ScrollViewBounceBack', 'scroll-view-bounce-back')
export class ScrollViewBounceBack {
    private scrollView!: Node;
    private label!: Label;
    private scrollView2!: ScrollView;

    @beforeClass
    async initData() {
        this.scrollView = find('Canvas/ScrollView')!;
        this.label = find('Canvas/LogLabel')?.getComponent(Label)!;
        this.scrollView2 = this.scrollView.getComponent(ScrollView)!;
    }

    @testCase
    async startPlay() {
        await screenshot_custom(60);
    }

    @testCase
    async scrolling() {
        // ScrollToRight
        this.scrollView2.scrollToPercentHorizontal(1, 1, true);
        await screenshot_custom(70);

        let str = this.label.string;
        await screenshot_custom(30);
        expect(this.label.string).to.equal(str);

        // ScrollToCenter
        this.scrollView2.scrollToPercentHorizontal(0.5, 1, true);
        await screenshot_custom(70);

        str = this.label.string;
        await screenshot_custom(30);
        expect(this.label.string).to.equal(str);

        // ScrollToLeft
        this.scrollView2.scrollToPercentHorizontal(0, 1, true);
        await screenshot_custom(70);

        str = this.label.string;
        await screenshot_custom(30);
        expect(this.label.string).to.equal(str);
    }
}