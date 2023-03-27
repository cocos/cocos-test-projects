import { Component, find, Touch } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass, beforeClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { GraphicsContinuousFilling } from '../../../cases/ui/14.graphics/graphics-continuous-filling';
import { screenshot_custom } from '../common/utils';

@runScene('graphics-continuous-filling')
@testClass('graphicsContinuousFilling')
export class graphicsContinuousFilling {
    _dt = 10;

    startTouch!:Touch;
    moveTouch1!:Touch;
    moveTouch2!:Touch;
    moveTouch3!:Touch;
    drawComponet!: GraphicsContinuousFilling|Component|null;

    @beforeClass
    async initData() {
      this.startTouch = new Touch(394, 334);
      this.moveTouch1 = new Touch(465, 340);
      this.moveTouch2 = new Touch(465, 340);
      this.moveTouch3 = new Touch(517, 288);

      this.drawComponet = find('Canvas/draw')!.getComponent('GraphicsContinuousFilling');
    }


    @testCase
    async startPlay() {
      await screenshot_custom(this._dt);
      this.drawComponet?.onTouchStart(this.startTouch, null);
      this.drawComponet?.onTouchMove(this.moveTouch1, null);
      await screenshot_custom(this._dt);
      this.drawComponet?.onTouchMove(this.moveTouch2, null);
      await screenshot_custom(this._dt);
      this.drawComponet?.onTouchMove(this.moveTouch3, null);
      await screenshot_custom(this._dt);
      this.drawComponet?.clear();
      await screenshot_custom(this._dt);
    }

}