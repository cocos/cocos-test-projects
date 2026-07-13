import { Component, find, Touch, view } from 'cc';
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
    screenWidth!:number;
    screenHeight!:number;

    @beforeClass
    async initData() {
      this.screenWidth = view.getCanvasSize().width;
      this.screenHeight = view.getCanvasSize().height;
      this.startTouch = new Touch(this.screenWidth/3, this.screenHeight/2);
      this.moveTouch1 = new Touch(this.screenWidth/2, this.screenHeight/2);
      this.moveTouch2 = new Touch(this.screenWidth/3, this.screenHeight/3);
      this.moveTouch3 = new Touch(this.screenWidth/2, this.screenHeight/3);

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