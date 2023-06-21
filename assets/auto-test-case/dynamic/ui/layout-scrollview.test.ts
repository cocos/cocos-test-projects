// @ts-ignore
import { testCase, testClass, waitForFrames } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';
import { find } from 'cc';
import { simulateMultiTouch, simulateTouchEnd, simulateTouchMove, simulateTouchStart } from '../common/SimulateEvent';

@testClass('LayoutScrollview', 'layout-scrollview')
export class LayoutScrollview {
    @testCase
    async startPlay() {
        await screenshot_custom(1);
    }

    @testCase
    async scrollVertical() {
        const node = find('Canvas/v/New ScrollView')!;
        simulateTouchStart(0, 0, node);
        simulateTouchMove(node, 0, 200);
        simulateTouchEnd(node, 0, 200);
        await screenshot_custom(30);
    }

    @testCase
    async scrollHorizontal() {
        const node = find('Canvas/h/New ScrollView')!;
        simulateTouchStart(0, 0, node);
        simulateTouchMove(node, -200, 0);
        simulateTouchEnd(node, -200, 0);
        await screenshot_custom(30);
    }
}