// @ts-ignore
import { find, Button, Color, Size } from 'cc';
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@testClass('SpriteAttributeSwitch', 'sprite-attribute-switch')
export class SpriteAttributeSwitch {
    _dt = 30;

    @testCase
    async start() {
      const caseScript: any = find('Canvas')!.getComponent("SpriteAttributeSwitch")!;
      const resetButton = find('Canvas/buttons/resetButton')!.getComponent(Button)!;
      const spriteFrameButton = find('Canvas/buttons/spriteFrameButton')!.getComponent(Button)!;
      const spriteTypeButton = find('Canvas/buttons/spriteTypeButton')!.getComponent(Button)!;
      const fillTypeButton = find('Canvas/buttons/fillTypeButton')!.getComponent(Button)!;

      await screenshot_custom(this._dt);

      find('Canvas/buttons/activeButton')!.getComponent(Button)?.clickEvents[0].emit([]);
      await screenshot_custom(this._dt);

      resetButton.clickEvents[0].emit([]);
      find('Canvas/buttons/enabledButton')!.getComponent(Button)?.clickEvents[0].emit([]);
      await screenshot_custom(this._dt);

      resetButton.clickEvents[0].emit([]);
      caseScript!.transform.contentSize = new Size(200 * 2 * 0.6, 200 * 2 * 0.4);
      caseScript!.updateState();
      //find('Canvas/buttons/contentSizeButton')!.getComponent(Button)?.clickEvents[0].emit([]);
      await screenshot_custom(this._dt);
      
      resetButton.clickEvents[0].emit([]);
      caseScript!.transform.anchorX = 0.1;
      caseScript!.updateState();
      //find('Canvas/buttons/AnchorXButton')!.getComponent(Button)?.clickEvents[0].emit([]);
      await screenshot_custom(this._dt);

      resetButton.clickEvents[0].emit([]);
      caseScript!.transform.anchorY = 0.9;
      caseScript!.updateState();
      //find('Canvas/buttons/AnchorYButton')!.getComponent(Button)?.clickEvents[0].emit([]);
      await screenshot_custom(this._dt);

      // The color of the button changes randomly, and fixed parameters are provided here
      resetButton.clickEvents[0].emit([]);
      caseScript!.sprite.color = new Color(255 * 0.5, 255 * 0.5, 255 * 0.5, 255 * 0.5);
      caseScript!.updateState();
      await screenshot_custom(this._dt);
      
      // spriteFrame
      resetButton.clickEvents[0].emit([]);
      await screenshot_custom(this._dt);
      spriteFrameButton.clickEvents[0].emit([]);
      await screenshot_custom(this._dt);

      // spriteType 1
      resetButton.clickEvents[0].emit([]);
      spriteTypeButton.clickEvents[0].emit([]);
      spriteTypeButton.clickEvents[0].emit([]);
      await screenshot_custom(this._dt);
      spriteTypeButton.clickEvents[0].emit([]);
      await screenshot_custom(this._dt);
      spriteTypeButton.clickEvents[0].emit([]);
      await screenshot_custom(this._dt);

      // spriteType 2
      resetButton.clickEvents[0].emit([]);
      spriteFrameButton.clickEvents[0].emit([]);
      spriteTypeButton.clickEvents[0].emit([]);
      spriteTypeButton.clickEvents[0].emit([]);
      await screenshot_custom(this._dt);
      spriteTypeButton.clickEvents[0].emit([]);
      await screenshot_custom(this._dt);
      spriteTypeButton.clickEvents[0].emit([]);
      await screenshot_custom(this._dt);

      // fillType 1
      resetButton.clickEvents[0].emit([]);
      spriteTypeButton.clickEvents[0].emit([]);
      spriteTypeButton.clickEvents[0].emit([]);
      spriteTypeButton.clickEvents[0].emit([]);
      fillTypeButton.clickEvents[0].emit([]);
      await screenshot_custom(this._dt);
      fillTypeButton.clickEvents[0].emit([]);
      await screenshot_custom(this._dt);
      fillTypeButton.clickEvents[0].emit([]);
      await screenshot_custom(this._dt);


      // fillType 1
      resetButton.clickEvents[0].emit([]);
      spriteFrameButton.clickEvents[0].emit([]);
      spriteTypeButton.clickEvents[0].emit([]);
      spriteTypeButton.clickEvents[0].emit([]);
      spriteTypeButton.clickEvents[0].emit([]);
      fillTypeButton.clickEvents[0].emit([]);
      await screenshot_custom(this._dt);
      fillTypeButton.clickEvents[0].emit([]);
      await screenshot_custom(this._dt);
      fillTypeButton.clickEvents[0].emit([]);
      await screenshot_custom(this._dt);
    }
}