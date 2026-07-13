// @ts-ignore
import { testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';
import { ScrollView, find } from 'cc';

@testClass('LayoutScrollview', 'layout-scrollview')
export class LayoutScrollview {
    @testCase
    async startPlay() {
        await screenshot_custom(2);
    }

    @testCase
    async scrollVertical() {
        const scrollView = find('Canvas/v/New ScrollView')?.getComponent(ScrollView)!;
        scrollView.scrollToPercentVertical(0, 0.5, true);
        await screenshot_custom(60);
    }

    @testCase
    async scrollHorizontal() {
        const scrollView = find('Canvas/h/New ScrollView')?.getComponent(ScrollView)!;
        scrollView.scrollToPercentHorizontal(1, 0.5, true);
        await screenshot_custom(60);
    }
}