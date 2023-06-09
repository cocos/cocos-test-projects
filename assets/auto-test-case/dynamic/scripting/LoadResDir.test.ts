import { find, Size, view } from 'cc';
// @ts-ignore
import { runScene, sleep, testCase, testClass, beforeClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('LoadResDir')
@testClass('LoadResDir')
export class LoadResDir {
    _dt = 135;
    canvasSize!: Size;
    width: number = 1197.5;
    height: number = 797.5;

    @beforeClass
    initData() {
        this.canvasSize = view.getCanvasSize();
        this.width =  this.canvasSize.width;
        this.height = this.canvasSize.height
    }
    @testCase
    async startPlay() {
        await screenshot_custom(this._dt);
    }

    @testCase
    async onLoadAll() {
        // @ts-ignore
        find('Canvas').getComponent('LoadResDirExample').onLoadAll();
        await screenshot_custom(this._dt);

        // @ts-ignore
        find('Canvas/ScrollView').getComponent('cc.ScrollView').content.position = { x: -this.width/4.6, y: this.height/1.14, z: 0 }
        await screenshot_custom(this._dt);
        // @ts-ignore
        find('Canvas/ScrollView').getComponent('cc.ScrollView').content.position = { x: -this.width/4.6, y: this.height/0.68, z: 0 }
        await screenshot_custom(this._dt);
        // @ts-ignore
        find('Canvas/ScrollView').getComponent('cc.ScrollView').content.position = { x: -this.width/4.6, y: this.height/0.38, z: 0 }
        await screenshot_custom(this._dt);
        // @ts-ignore
        find('Canvas/ScrollView').getComponent('cc.ScrollView').content.position = { x: -this.width/4.6, y: this.height/0.315, z: 0 }
        await screenshot_custom(this._dt);
        // @ts-ignore
        find('Canvas/ScrollView').getComponent('cc.ScrollView').content.position = { x: -this.width/4.6, y:  this.height/0.26, z: 0 }
        await screenshot_custom(this._dt);
        // @ts-ignore
        find('Canvas/ScrollView').getComponent('cc.ScrollView').content.position = { x: -this.width/4.6, y: this.height/0.26, z: 0 }
        await screenshot_custom(this._dt);
    }

    @testCase
    async onLoadSpriteFrameAll() {
        // @ts-ignore
        find('Canvas').getComponent('LoadResDirExample').onLoadSpriteFrameAll();
        await screenshot_custom(this._dt);
    }

    @testCase
    async onClearAll() {
        // @ts-ignore
        find('Canvas').getComponent('LoadResDirExample').onClearAll();
        await screenshot_custom(this._dt);
    }

}