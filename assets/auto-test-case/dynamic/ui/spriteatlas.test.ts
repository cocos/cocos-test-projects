import { find, Button, Color, Component } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass, beforeClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { Test } from '../../../cases/ui/17.sprite-atlas/TS/Test';
import { screenshot_custom } from '../common/utils';

@runScene('spriteatlas')
@testClass('Spriteatlas')
export class Spriteatlas {
    _dt = 30;

    testScript!: Test | Component | null;

    @beforeClass
    async initData() {
      this.testScript = find('Canvas/Sprite')!.getComponent("Test")
    }

    @testCase
    async start() {
      await screenshot_custom(this._dt);
      this.testScript!.editbox.string = "lake";
      find('Canvas/Button-1')!.getComponent(Button)?.clickEvents[0].emit([]);
      await screenshot_custom(this._dt);
      find('Canvas/Button-3')!.getComponent(Button)?.clickEvents[0].emit([]);
      await screenshot_custom(this._dt);
      find('Canvas/Button-2')!.getComponent(Button)?.clickEvents[0].emit([]);
      await screenshot_custom(this._dt);
      find('Canvas/Button-1')!.getComponent(Button)?.clickEvents[0].emit([]);
      await screenshot_custom(this._dt);
      find('Canvas/Button-4')!.getComponent(Button)?.clickEvents[0].emit([]);
      await screenshot_custom(this._dt);
    }
}