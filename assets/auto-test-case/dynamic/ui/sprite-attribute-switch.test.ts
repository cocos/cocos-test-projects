// @ts-ignore
import { find, Button, Color, Size } from 'cc';
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('sprite-attribute-switch')
@testClass('SpriteAttributeSwitch')
export class SpriteAttributeSwitch {
    _dt = 30;

    @testCase
    async start() {
      await screenshot_custom(this._dt);
      find('Canvas/buttons/activeButton')!.getComponent(Button)?.clickEvents[0].emit([]);
      await screenshot_custom(this._dt)
      find('Canvas/buttons/resetButton')!.getComponent(Button)?.clickEvents[0].emit([]);
      find('Canvas/buttons/enabledButton')!.getComponent(Button)?.clickEvents[0].emit([]);
      await screenshot_custom(this._dt);
      find('Canvas/buttons/resetButton')!.getComponent(Button)?.clickEvents[0].emit([]);
      find('Canvas')!.getComponent("SpriteAttributeSwitch")!.transform.contentSize = new Size(200 * 2 * 0.5, 200 * 2 * 0.4);
      find('Canvas')!.getComponent("SpriteAttributeSwitch")!.updateState();
      //find('Canvas/buttons/contentSizeButton')!.getComponent(Button)?.clickEvents[0].emit([]);

      await screenshot_custom(this._dt);
      find('Canvas/buttons/resetButton')!.getComponent(Button)?.clickEvents[0].emit([]);
      find('Canvas')!.getComponent("SpriteAttributeSwitch")!.transform.anchorX = 0.5;
      find('Canvas')!.getComponent("SpriteAttributeSwitch")!.updateState();
      //find('Canvas/buttons/AnchorXButton')!.getComponent(Button)?.clickEvents[0].emit([]);


      await screenshot_custom(this._dt);
      find('Canvas/buttons/resetButton')!.getComponent(Button)?.clickEvents[0].emit([]);
      find('Canvas')!.getComponent("SpriteAttributeSwitch")!.transform.anchorY = randY;
      find('Canvas')!.getComponent("SpriteAttributeSwitch")!.updateState();
      //find('Canvas/buttons/AnchorYButton')!.getComponent(Button)?.clickEvents[0].emit([]);

      // The color of the button changes randomly, and fixed parameters are provided here
      await screenshot_custom(this._dt);
      find('Canvas/buttons/resetButton')!.getComponent(Button)?.clickEvents[0].emit([]);
      find('Canvas')!.getComponent("SpriteAttributeSwitch")!.sprite.color = new Color(255 * 0.5, 255 * 0.5, 255 * 0.5, 255 * 0.5);
      find('Canvas')!.getComponent("SpriteAttributeSwitch")!.updateState();

      await screenshot_custom(this._dt);
      find('Canvas/buttons/resetButton')!.getComponent(Button)?.clickEvents[0].emit([]);
      find('Canvas/buttons/spriteFrameButton')!.getComponent(Button)?.clickEvents[0].emit([]);
      await screenshot_custom(this._dt);
      find('Canvas/buttons/resetButton')!.getComponent(Button)?.clickEvents[0].emit([]);
      find('Canvas/buttons/spriteTypeButton')!.getComponent(Button)?.clickEvents[0].emit([]);
      find('Canvas/buttons/spriteTypeButton')!.getComponent(Button)?.clickEvents[0].emit([]);
      await screenshot_custom(this._dt);
      find('Canvas/buttons/resetButton')!.getComponent(Button)?.clickEvents[0].emit([]);
      find('Canvas/buttons/fillTypeButton')!.getComponent(Button)?.clickEvents[0].emit([]);
      await screenshot_custom(this._dt);
    }
}