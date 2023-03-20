// @ts-ignore
import { find, Button } from 'cc';
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('Sprite-attribute-switch')
@testClass('SpriteAttributeSwitch')
export class StaticUi {
    _dt = 30;

    @testCase
    async start() {
      screenshot_custom(this._dt);
      find('Canvas/buttons/activeButton')!.getComponent(Button)?.clickEvents[0].emit([]);
      screenshot_custom(this._dt)
      find('Canvas/buttons/resetButton')!.getComponent(Button)?.clickEvents[0].emit([]);
      find('Canvas/buttons/enabledButton')!.getComponent(Button)?.clickEvents[0].emit([]);
      screenshot_custom(this._dt);
      find('Canvas/buttons/resetButton')!.getComponent(Button)?.clickEvents[0].emit([]);
      find('Canvas/buttons/contentSizeButton')!.getComponent(Button)?.clickEvents[0].emit([]);
      screenshot_custom(this._dt);
      find('Canvas/buttons/resetButton')!.getComponent(Button)?.clickEvents[0].emit([]);
      find('Canvas/buttons/AnchorXButton')!.getComponent(Button)?.clickEvents[0].emit([]);
      screenshot_custom(this._dt);
      find('Canvas/buttons/resetButton')!.getComponent(Button)?.clickEvents[0].emit([]);
      find('Canvas/buttons/AnchorYButton')!.getComponent(Button)?.clickEvents[0].emit([]);
      screenshot_custom(this._dt);
      find('Canvas/buttons/resetButton')!.getComponent(Button)?.clickEvents[0].emit([]);
      find('Canvas/buttons/colorButton')!.getComponent(Button)?.clickEvents[0].emit([]);
      screenshot_custom(this._dt);
      find('Canvas/buttons/resetButton')!.getComponent(Button)?.clickEvents[0].emit([]);
      find('Canvas/buttons/spriteFrameButton')!.getComponent(Button)?.clickEvents[0].emit([]);
      screenshot_custom(this._dt);
      find('Canvas/buttons/resetButton')!.getComponent(Button)?.clickEvents[0].emit([]);
      find('Canvas/buttons/spriteTypeButton')!.getComponent(Button)?.clickEvents[0].emit([]);
      screenshot_custom(this._dt);
      find('Canvas/buttons/resetButton')!.getComponent(Button)?.clickEvents[0].emit([]);
      find('Canvas/buttons/fillTypeButton')!.getComponent(Button)?.clickEvents[0].emit([]);
      screenshot_custom(this._dt);
    }
}