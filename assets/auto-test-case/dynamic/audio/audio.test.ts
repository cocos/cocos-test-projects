// @ts-ignore
import { waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';
import { find, Slider, AudioSource } from 'cc';

@runScene('audio')
@testClass('Audio')
export class Audio {
    @testCase
    async startSPlay() {
        //@ts-ignore
        await screenshot_custom();
    }

    @testCase
    async onButtonClicKed() {
        //@ts-ignore
        find('AudioController')?.getComponent('AudioController').onButtonClicked(null, 0);
        await screenshot_custom();
        //@ts-ignore
        find('AudioController')?.getComponent('AudioController').onButtonClicked(null, 1);
        await screenshot_custom();
        //@ts-ignore
        find('AudioController')?.getComponent('AudioController').onButtonClicked(null, 2);
        await screenshot_custom();
        //@ts-ignore
        find('AudioController')?.getComponent('AudioController').onButtonClicked(null, 3);
        await screenshot_custom();
        //@ts-ignore
        find('AudioController')?.getComponent('AudioController').onButtonClicked(null, 4);
        await screenshot_custom();
        //@ts-ignore
        find('AudioController')?.getComponent('AudioController').onButtonClicked(null, 5);
        await screenshot_custom();
        //@ts-ignore
        find('AudioController')?.getComponent('AudioController').onButtonClicked(null, 6);
        await screenshot_custom();
        // //@ts-ignore
        // find('AudioController')?.getComponent('AudioController').onButtonClicked(null, 7)
        // await screenshot_custom()
    }

    @testCase
    async onVolumeSliderChanged() {
        //@ts-ignore
        find('AudioController')?.getComponent('AudioController').onButtonClicked(null, 6);
        //注意此处是无法完全模拟界面上的触发事件的需要引擎组改变用例
        //@ts-ignore
        find('AudioController')?.getComponent('AudioController').onVolumeSliderChanged((find('Canvas/Volume/VolumeSlider').getComponent('cc.Slider').progress = 0.5));
        await screenshot_custom();
    }
}
