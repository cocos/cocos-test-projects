import { find, Button, Color, Component } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass, beforeClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { Test } from '../../../cases/ui/17.sprite-atlas/TS/Test';
import { screenshot_custom } from '../common/utils';

@testClass('Spriteatlas', 'spriteatlas')
export class Spriteatlas {
    _dt = 10;

    testScript!: Test | null;

    @beforeClass
    async initData() {
      this.testScript = find('Canvas/Sprite')!.getComponent("Test") as Test;
    }

    @testCase
    async start() {
      const buttonChange = find('Canvas/Button-1')!.getComponent(Button)!;
      const buttonClean = find('Canvas/Button-2')!.getComponent(Button)!;
      const buttonReplace = find('Canvas/Button-3')!.getComponent(Button)!;
      const buttonTips = find('Canvas/Button-4')!.getComponent(Button)!;

      await screenshot_custom(this._dt);

      this.testScript!.editbox.string = "lake";
      buttonChange.clickEvents[0].emit([]);
      await screenshot_custom(this._dt); // 2

      this.testScript!.editbox.string = "mountain";
      buttonChange.clickEvents[0].emit([]);
      await screenshot_custom(this._dt); // 3

      this.testScript!.editbox.string = "wrong";
      buttonChange.clickEvents[0].emit([]);
      await screenshot_custom(this._dt); // 4

      this.testScript!.editbox.string = "sea";
      buttonReplace.clickEvents[0].emit([]);
      await screenshot_custom(this._dt); //5

      this.testScript!.editbox.string = "tree";
      buttonReplace.clickEvents[0].emit([]);
      await screenshot_custom(this._dt); // 6

      this.testScript!.editbox.string = "wrong";
      buttonReplace.clickEvents[0].emit([]);
      await screenshot_custom(this._dt); // 7

      this.testScript!.editbox.string = "lake";
      buttonChange.clickEvents[0].emit([]);
      await screenshot_custom(this._dt); // 9

      buttonClean.clickEvents[0].emit([]);
      await screenshot_custom(this._dt); // clean

      buttonChange.clickEvents[0].emit([]);
      await screenshot_custom(this._dt); // 10

      buttonTips.clickEvents[0].emit([]);
      await screenshot_custom(this._dt); // 11

      buttonTips.clickEvents[0].emit([]);
      await screenshot_custom(this._dt); // 12
    }
}