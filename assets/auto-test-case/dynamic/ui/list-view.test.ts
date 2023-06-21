// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';
import { find } from 'cc';
import { simulateTouchEnd, simulateTouchMove, simulateTouchStart } from '../common/SimulateEvent';

@testClass('ListView', 'list-view')
export class ListView {
    @testCase
    async startPlay() {
        await screenshot_custom(1);
    }

    @testCase
    async addItem() {
        const btn = find('Canvas/add-btn')!;
        for (let i=0; i<11; i++) {
            simulateTouchStart(0, 0, btn);
            simulateTouchEnd(btn, 0, 0);
        }
        const scrollView = find('Canvas/New ScrollView')!;
        simulateTouchStart(0, 0, scrollView);
        simulateTouchMove(scrollView, 0, 200);
        simulateTouchEnd(scrollView, 0, 200);
        await screenshot_custom(60);
    }

    @testCase
    async removeItem() {
        const btn = find('Canvas/remove-btn')!;
        simulateTouchStart(0, 0, btn);
        simulateTouchEnd(btn, 0, 0);
        await screenshot_custom(30);
    }

    @testCase
    async jump() {
        const btn = find('Canvas/jump-btn')!;
        simulateTouchStart(0, 0, btn);
        simulateTouchEnd(btn, 0, 0);
        await screenshot_custom(120);
    }
}