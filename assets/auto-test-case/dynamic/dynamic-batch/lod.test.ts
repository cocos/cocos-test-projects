// @ts-ignore
import { testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';
import { find } from 'cc';
import { simulateTouchStart, simulateTouchEnd } from '../common/SimulateEvent';

@testClass('LodTest', 'lod')
export class LodTest {
    @testCase
    async start() {
      await screenshot_custom(30);
      await screenshot_custom(370);

      const node = find('Canvas/Toggle')!;
      simulateTouchStart(0, 0, node);
      simulateTouchEnd(node, 0, 0);

      await screenshot_custom(500);
      await screenshot_custom(420);
    }
}