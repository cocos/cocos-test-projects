// @ts-ignore
import { testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';
import { find, game } from 'cc';
import { simulateTouchStart, simulateTouchEnd } from '../common/SimulateEvent';

@testClass('ContainerStrategy', 'containerStrategy')
export class ContainerStrategy {
    @testCase
    async toggleEqualToFrame() {
      const node = find('Canvas/ToggleGroup/ToggleEqualToFrame')!;
      simulateTouchStart(0, 0, node);
      simulateTouchEnd(node, 0, 0);
      await screenshot_custom(5);

      game.canvas!.width = 400;
      await screenshot_custom(5);
    }

    @testCase
    async toggleProportionalToFrame() {
      const node = find('Canvas/ToggleGroup/ToggleProportionalToFrame')!;
      simulateTouchStart(0, 0, node);
      simulateTouchEnd(node, 0, 0);
      await screenshot_custom(50);
    }
}
