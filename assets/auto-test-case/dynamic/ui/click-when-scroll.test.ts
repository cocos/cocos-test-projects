// @ts-ignore
import { testCase, testClass, waitForFrames } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';
import { find, Button } from 'cc';
import { simulateTouchStart, simulateTouchEnd, simulateTouchMove, UISimulate } from '../common/SimulateEvent';

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
            UISimulate.clickButton(item!.getComponent(Button)!);
            await screenshot_custom_by_wait(5);
        }
    }
}