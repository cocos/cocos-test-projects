import { find } from 'cc';
// @ts-ignore
import { testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { simulateTouchStart, simulateTouchMove, simulateTouchEnd } from '../common/SimulateEvent';
import { screenshot_custom } from '../common/utils';

@testClass('ScrollViewRotation', 'scroll-view-rotation')
export class ScrollViewRotation {
    @testCase
    async startPlay() {
        await screenshot_custom(1);
    }

    @testCase
    async scrollView0() {
        const node = find('Canvas/0')!;

        // ScrollToBottom
        simulateTouchStart(0, 0, node);
        simulateTouchMove(node, 0, 400);
        simulateTouchEnd(node, 0, 400);
        await screenshot_custom(30);

        // ScrollToTop
        simulateTouchStart(0, 0, node);
        simulateTouchMove(node, 0, -800);
        simulateTouchEnd(node, 0, -800);
        await screenshot_custom(30);
    }

    @testCase
    async scrollView45() {
        const node = find('Canvas/45')!;

        // ScrollToBottom
        simulateTouchStart(0, 0, node);
        simulateTouchMove(node, 0, 400);
        simulateTouchEnd(node, 0, 400);
        await screenshot_custom(30);

        // ScrollToTop
        simulateTouchStart(0, 0, node);
        simulateTouchMove(node, 0, -800);
        simulateTouchEnd(node, 0, -800);
        await screenshot_custom(30);
    }

    @testCase
    async scrollView90() {
        const node = find('Canvas/90')!;

        // ScrollToRight
        simulateTouchStart(0, 0, node);
        simulateTouchMove(node, -300, 0);
        simulateTouchEnd(node, -300, 0);
        await screenshot_custom(30);

        // ScrollToLeft
        simulateTouchStart(0, 0, node);
        simulateTouchMove(node, 800, 0);
        simulateTouchEnd(node, 800, 0);
        await screenshot_custom(30);
    }

    @testCase
    async scrollView135() {
        const node = find('Canvas/135')!;

        // ScrollToTop
        simulateTouchStart(0, 0, node);
        simulateTouchMove(node, 0, -800);
        simulateTouchEnd(node, 0, -800);
        await screenshot_custom(30);

        // ScrollToBottom
        simulateTouchStart(0, 0, node);
        simulateTouchMove(node, 0, 400);
        simulateTouchEnd(node, 0, 400);
        await screenshot_custom(30);
    }
}