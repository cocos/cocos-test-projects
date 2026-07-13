//@ts-ignore
import { testCase, testClass, beforeClass, waitForFrames } from 'db://automation-framework/runtime/test-framework.mjs';
import { PlayerController } from '../../../cases/light-probe/player-controller';
import { screenshot_custom } from '../common/utils';
import { simulateTouchStart, simulateTouchEnd } from '../common/SimulateEvent';
import { find } from 'cc';

@testClass("Sponza", "sponza")
export class Sponza {
    private caseScript?: PlayerController;

    @beforeClass
    async initData() {
        this.caseScript = find('Canvas')?.getComponent(PlayerController) as PlayerController;
    }

    @testCase
    async start() {
        await screenshot_custom(5);

        simulateTouchStart(10, 10, this.caseScript?.upButton.node);
        await screenshot_custom(300);
        simulateTouchEnd(this.caseScript?.upButton.node);

        simulateTouchStart(10, 10, this.caseScript?.upButton.node);
        await screenshot_custom(300);
        await waitForFrames(30);
        simulateTouchEnd(this.caseScript?.upButton.node);

        simulateTouchStart(10, 10, this.caseScript?.leftButton.node);
        await screenshot_custom(100);
        simulateTouchEnd(this.caseScript?.leftButton.node);

        simulateTouchStart(10, 10, this.caseScript?.downButton.node);
        await screenshot_custom(5);
        simulateTouchEnd(this.caseScript?.downButton.node);

        simulateTouchStart(10, 10, this.caseScript?.rightButton.node);
        await screenshot_custom(120);
        simulateTouchEnd(this.caseScript?.rightButton.node);
    }
}
