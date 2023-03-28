import { find, Button, Component } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass, beforeClass, waitForFrames} from 'db://automation-framework/runtime/test-framework.mjs';
import { VietnameseText } from '../../../cases/ui/02.label/vietnamese/VietnameseText';
import { Test } from '../../../cases/ui/17.sprite-atlas/TS/Test';
import { screenshot_custom } from '../common/utils';

@runScene('vietnamese-show')
@testClass('VietnameseShow')
export class VietnameseShow {
    _dt = 30;

    testScript!: VietnameseText | Component | null;
    isLoadButton = false;

    @beforeClass
    async initData() {
      this.testScript = find('Canvas')!.getComponent("VietnameseText");
    }

    @testCase
    async start() {
      let num = 1000; //Used for counting frames, up to 1000 frames
      let isLoadButton = this.testScript!.isLoadButton;
      while(!isLoadButton && num>0){
          num -= 1;
          isLoadButton = this.testScript!.isLoadButton;
          await waitForFrames(1); 
      }
      
      await screenshot_custom(this._dt);
      let btns = this.testScript.btnContainer.children;
      if(btns && btns.length>1){
        for(let i=1; i<btns.length; i++){
          let ele = btns[i];
          ele.emit(Button.EventType.CLICK);
          await screenshot_custom(this._dt);
        }
      }
    }
}