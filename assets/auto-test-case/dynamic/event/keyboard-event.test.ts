import { find, EventKeyboard } from 'cc';
// @ts-ignore
import { testCase, testClass, PlatformEnum } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@testClass('keyboardEvent', 'keyboard-event', [PlatformEnum.ANDROID, PlatformEnum.IOS, PlatformEnum.HARMONY_OS, PlatformEnum.HUAWEI_AGC,
  PlatformEnum.BYTEDANCE_MINI_GAME, PlatformEnum.OPPO_MINI_GAME, PlatformEnum.HUAWEI_QUICK_GAME, PlatformEnum.VIVO_MINI_GAME, PlatformEnum.XIAOMI_QUICK_GAME,
  PlatformEnum.BAIDU_MINI_GAME, PlatformEnum.WECHATGAME, PlatformEnum.COCOS_PLAY, PlatformEnum.COCOS_RUNTIME, PlatformEnum.WEB_MOBILE])
export class keyboardEvent {
    _dt = 10;

    @testCase
    async startPlay() {
      const caseScript = find('Canvas/keyboard-event')!.getComponent('KeyboardEvent')! as any;
      const eventKeyDown = new EventKeyboard(81, true);
      const eventKeyUp = new EventKeyboard(81, false);

      await screenshot_custom(this._dt);

      caseScript.onKeyboardDown(eventKeyDown);
      await screenshot_custom(this._dt);
      
      caseScript.onKeyboardPressing(eventKeyUp);
      await screenshot_custom(this._dt);

      caseScript.onKeyboardUp(eventKeyUp);
      await screenshot_custom(this._dt);

      await screenshot_custom(this._dt);
    }

}