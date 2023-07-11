import { ScrollView, find } from 'cc';
// @ts-ignore
import { testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@testClass('ScrollViewRotation', 'scroll-view-rotation')
export class ScrollViewRotation {
    @testCase
    async startPlay() {
        await screenshot_custom(1);
    }

    @testCase
    async scrollView0() {
        const scrollView = find('Canvas/0')?.getComponent(ScrollView)!;

        // ScrollToBottom
        scrollView.scrollToBottom(0.1);
        await screenshot_custom(30);

        // ScrollToTop
        scrollView.scrollToTop(0.1);
        await screenshot_custom(30);
    }

    @testCase
    async scrollView45() {
        const scrollView = find('Canvas/45')?.getComponent(ScrollView)!;

        // ScrollToBottom
        scrollView.scrollToBottom(0.1);
        await screenshot_custom(30);

        // ScrollToTop
        scrollView.scrollToTop(0.1);
        await screenshot_custom(30);
    }

    @testCase
    async scrollView90() {
        const scrollView = find('Canvas/90')?.getComponent(ScrollView)!;

        // ScrollToBottom
        scrollView.scrollToBottom(0.1);
        await screenshot_custom(30);

        // ScrollToTop
        scrollView.scrollToTop(0.1);
        await screenshot_custom(30);
    }

    @testCase
    async scrollView135() {
        const scrollView = find('Canvas/135')?.getComponent(ScrollView)!;

        // ScrollToBottom
        scrollView.scrollToBottom(0.1);
        await screenshot_custom(30);

        // ScrollToTop
        scrollView.scrollToTop(0.1);
        await screenshot_custom(30);
    }
}