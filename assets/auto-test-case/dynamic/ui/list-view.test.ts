// @ts-ignore
import { testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';
import { Button, ScrollView, find } from 'cc';
import { UISimulate } from '../common/SimulateEvent';

@testClass('ListView', 'list-view')
export class ListView {
    @testCase
    async startPlay() {
        await screenshot_custom(1);
    }

    @testCase
    async addItem() {
        const btn = find('Canvas/add-btn')?.getComponent(Button)!;
        for (let i=0; i<11; i++) {
            UISimulate.clickButton(btn);
        }
        const scrollView = find('Canvas/New ScrollView')?.getComponent(ScrollView)!;
        scrollView.scrollToBottom(0.5);
        await screenshot_custom(60);
    }

    @testCase
    async removeItem() {
        const btn = find('Canvas/remove-btn')?.getComponent(Button)!;
        UISimulate.clickButton(btn);
        await screenshot_custom(10);
    }

    @testCase
    async jump() {
        const btn = find('Canvas/jump-btn')?.getComponent(Button)!;
        UISimulate.clickButton(btn);
        await screenshot_custom(120);
    }
}