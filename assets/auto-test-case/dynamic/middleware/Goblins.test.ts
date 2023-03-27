// @ts-ignore
import { find, Button } from 'cc';
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('Goblins')
@testClass('Goblins')
export class Goblins {
    _dt = 10;

    @testCase
    async start() {
      await screenshot_custom(this._dt);
      find('Canvas/Button-002')!.getComponent(Button)?.clickEvents[0].emit([]);
      await screenshot_custom(this._dt);
      find('Canvas/Button-002')!.getComponent(Button)?.clickEvents[0].emit([]);
      await screenshot_custom(this._dt);
      find('Canvas/Button-002')!.getComponent(Button)?.clickEvents[0].emit([]);

      find('Canvas/Button-001')!.getComponent(Button)?.clickEvents[0].emit([]);
      await screenshot_custom(this._dt);
      find('Canvas/Button-002')!.getComponent(Button)?.clickEvents[0].emit([]);
      await screenshot_custom(this._dt);
      find('Canvas/Button-002')!.getComponent(Button)?.clickEvents[0].emit([]);
      await screenshot_custom(this._dt);
    }
}