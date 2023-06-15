//@ts-ignore
import { testCase, testClass, waitForFrames } from 'db://automation-framework/runtime/test-framework.mjs';
import { PlayerController } from '../../../cases/light-probe/player-controller';
import { screenshot_custom } from '../common/utils';
import { simulateTouchStart, simulateTouchEnd } from '../common/SimulateEvent';
import { find } from 'cc';

@testClass("Sponza", "sponza")
export class Sponza {
    @testCase
    async start() {
        await screenshot_custom(5);

        // move back the character
        const caseScript = find('Canvas')?.getComponent(PlayerController);
        simulateTouchStart(10, 10, caseScript?.downButton.node);
        await screenshot_custom(100);
        simulateTouchEnd(caseScript?.downButton.node);
    }
}
