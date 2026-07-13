import { find } from 'cc';
// @ts-ignore
import { captureOneImage, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('slider')
@testClass('Slider')
export class Slider {
    _dt = 5;

    @testCase
    async startPlay() {
        await screenshot_custom(this._dt);
    }

    @testCase
    async slider_00() {
        // @ts-ignore
        find('Canvas/New Slider').getComponent('cc.Slider').progress = 0;
        // @ts-ignore
        find('Canvas/New Sprite').getComponent('SliderCtrl').changeAlpha(find('Canvas/New Slider').getComponent('cc.Slider'));
        await screenshot_custom(this._dt);
    }


    @testCase
    async slider_05() {
        // @ts-ignore
        find('Canvas/New Slider').getComponent('cc.Slider').progress = 0.5;
        // @ts-ignore
        find('Canvas/New Sprite').getComponent('SliderCtrl').changeAlpha(find('Canvas/New Slider').getComponent('cc.Slider'));
        await screenshot_custom(this._dt);
    }


    @testCase
    async slider_10() {
        // @ts-ignore
        find('Canvas/New Slider').getComponent('cc.Slider').progress = 1;
        // @ts-ignore
        find('Canvas/New Sprite').getComponent('SliderCtrl').changeAlpha(find('Canvas/New Slider').getComponent('cc.Slider'));
        await screenshot_custom(this._dt);
    }

}