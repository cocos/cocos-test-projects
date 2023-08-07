// @ts-ignore
import { testCase, testClass, waitForFrames } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';
import { input, Input, find, Touch, EventTouch, Event, EventMouse } from 'cc';
import { simulateTouchStart, simulateTouchEnd, simulateMultiTouch, simulateTouchMove } from '../common/SimulateEvent';

@testClass('ClickWhenScroll', 'click-when-scroll')
export class ClickWhenScroll {
    @testCase
    async startPlay() {
        await screenshot_custom_by_wait(5);
    }

    @testCase
    async clickItem() {
        const contentNode = find('Canvas/New ScrollView/view/content')!;

        for (let item, i=0; i<7; i++) {
            if (i === 5) {
                simulateTouchStart(0, 0, contentNode);
                simulateTouchMove(contentNode, 0, 200);
                simulateTouchEnd(contentNode, 0, 200);
                await waitForFrames(60);
            }
            item = contentNode?.children[i];
            simulateTouchStart(0, 0, item);
            simulateTouchEnd(item, 0, 0);
            await screenshot_custom_by_wait(5);
        }
    }
}