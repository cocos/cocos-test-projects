import { find } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass, waitForFrames } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('mask-migrate')
@testClass('maskMigrate')
export class maskMigrate {
    _dt = 10;

    @testCase
    async startPlay() {
      let num = 1000; //Used for counting frames, up to 1000 frames
      let isReady = find('Canvas')!.getComponent('mask_migrate').ready;
      while(!isReady && num>0){
          isReady = find('Canvas')!.getComponent('mask_migrate').ready;
          num -= 1;
          await waitForFrames(1); 
      }
      await screenshot_custom(this._dt)
    }

}