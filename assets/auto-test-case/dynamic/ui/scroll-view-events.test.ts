// @ts-ignore
import { runScene, testCase, testClass, waitForFrames } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';
import { ScrollView, Vec2, find } from 'cc';
import { simulateTouchStart, simulateTouchMove, simulateTouchEnd } from '../common/SimulateEvent';

@testClass('ScrollViewEvents', 'scroll-view-events')
export class ScrollViewEvents {
    @testCase
    async startPlay() {
        await screenshot_custom(1);
    }

    @testCase
    async scrollHorizontal() {
        const node = find('Canvas/horizontal/New ScrollView')!;

        // ScrollToRight
        simulateTouchStart(0, 0, node);
        simulateTouchMove(node, -200, 0);
        await screenshot_custom(1);

        // BounceToRight
        simulateTouchEnd(node, -200, 0);
        await screenshot_custom(90);

        // ScrollToLeft
        simulateTouchStart(0, 0, node);
        simulateTouchMove(node, 400, 0);
        await screenshot_custom(1);

        // BounceToLeft
        simulateTouchEnd(node, 400, 0);
        await screenshot_custom(90);
    }

    @testCase
    async scrollVertical() {
        const node = find('Canvas/vertical/New ScrollView')!;

        // ScrollToBottom
        simulateTouchStart(0, 0, node);
        simulateTouchMove(node, 0, 400);
        await screenshot_custom(1);

        // BounceToBottom
        simulateTouchEnd(node, 0, 400);
        await screenshot_custom(90);

        // ScrollToTop
        simulateTouchStart(0, 0, node);
        simulateTouchMove(node, 0, -400);
        await screenshot_custom(1);

        // BounceToTop
        simulateTouchEnd(node, 0, -400);
        await screenshot_custom(90);
    }
}