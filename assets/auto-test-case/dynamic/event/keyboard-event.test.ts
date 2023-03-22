import { find, EventKeyboard } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass, waitForFrames } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('keyboard-event')
@testClass('keyboardEvent')
export class keyboardEvent {
    _dt = 10;

    @testCase
    async startPlay() {
      let event = new EventKeyboard(81, false);
      await waitForFrames(this._dt);

      find('Canvas/keyboard-event')!.getComponent('KeyboardEvent')!.onKeyboardDown(event);
      await screenshot_custom();
      await waitForFrames(this._dt);
      
      find('Canvas/keyboard-event')!.getComponent('KeyboardEvent')!.onKeyboardPressing(event);
      await screenshot_custom();
      await waitForFrames(this._dt);

      find('Canvas/keyboard-event')!.getComponent('KeyboardEvent')!.onKeyboardUp(event);
      await screenshot_custom();
      await waitForFrames(this._dt);
    }

}