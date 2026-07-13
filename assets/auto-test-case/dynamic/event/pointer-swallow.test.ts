// @ts-ignore
import { testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';
import { find } from 'cc';
import { simulateTouchStart, simulateTouchEnd, simulateTouchMove } from '../common/SimulateEvent';

@testClass('PointerSwallow', 'pointer-swallow')
export class PointerSwallow {
    @testCase
    async startPlay() {
      await screenshot_custom();
    }

    @testCase
    async swallow() {
      const node1 = find('Canvas/Node-Left/Button')!;
      simulateTouchStart(0, 0, node1);
      simulateTouchMove(node1, 0, 10);
      simulateTouchEnd(node1, 0, 10);
      await screenshot_custom(10);

      const node2 = find('Canvas/Node-Middle/Button')!;
      simulateTouchStart(0, 0, node2);
      simulateTouchMove(node2, 0, 10);
      simulateTouchEnd(node2, 0, 10);
      await screenshot_custom(10);

      const node3 = find('Canvas/Node-Right/Button')!;
      simulateTouchStart(0, 0, node3);
      simulateTouchMove(node3, 0, 10);
      simulateTouchEnd(node3, 0, 10);
      await screenshot_custom(10);
    }
}
