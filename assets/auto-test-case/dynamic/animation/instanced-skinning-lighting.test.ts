import { EventHandler, Slider, Toggle, find } from 'cc';
// @ts-ignore
import { testCase, testClass, beforeClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@testClass('InstancedSkinningLighting', 'instanced-skinning-lighting')
export class InstancedSkinningLighting {
    private toggle!: Toggle;
    private slider!: Slider;

    @beforeClass
    async initData() {
        this.toggle = find('Canvas/Toggle')?.getComponent(Toggle)!;
        this.slider = find('Canvas/Slider')?.getComponent(Slider)!;
    }

    @testCase
    async start() {
        await screenshot_custom(2);
    }

    @testCase
    async setGroups1() {
        for (let i of [0, 0.05, 0.1, 0.15, 0.3, 0.5, 1]) {
            this.slider.progress = i;
            EventHandler.emitEvents(this.slider.slideEvents, this.slider);
            await screenshot_custom(30);
        }
    }

    @testCase
    async setGroups2() {
        this.toggle.isChecked = true;
        EventHandler.emitEvents(this.toggle.checkEvents, this.toggle);
        
        for (let i of [0, 0.05, 0.1, 0.15, 0.3, 0.5, 1]) {
            this.slider.progress = i;
            EventHandler.emitEvents(this.slider.slideEvents, this.slider);
            await screenshot_custom(30);
        }
    }
}
