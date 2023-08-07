import { EventHandler, Slider, Toggle, find, Node } from 'cc';
// @ts-ignore
import { testCase, testClass, beforeClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';
import { FirstPersonCamera } from '../../../shared-res/first-person-camera';

@testClass('InstancedSkinningLighting', 'instanced-skinning-lighting')
export class InstancedSkinningLighting {
    private toggle!: Toggle;
    private slider!: Slider;
    private camera!: Node;

    @beforeClass
    async initData() {
        this.toggle = find('Canvas/Toggle')?.getComponent(Toggle)!;
        this.slider = find('Canvas/Slider')?.getComponent(Slider)!;
        this.camera = find('Camera')!;
        this.camera.getComponent(FirstPersonCamera)!.enabled = false;
    }

    @testCase
    async start() {
        await screenshot_custom(2);
    }

    @testCase
    async setGroups1() {
        this.slider.progress = 0.5;
        EventHandler.emitEvents(this.slider.slideEvents, this.slider);
        await screenshot_custom(30);

        this.camera.setPosition(72.89037919539744, 69.1681749364538, 122.07584548695787);
        this.camera.setRotation(-0.27354449145630166, 0.014855429665569025, 0.004225300622927272, 0.9617353452161412);
        await screenshot_custom(30);

        this.slider.progress = 1;
        EventHandler.emitEvents(this.slider.slideEvents, this.slider);
        this.camera.setPosition(146.9864671233138, 122.52474055436167, 211.78317084154207);
        this.camera.setRotation(-0.26517307761640896, -0.0002533028105553636, -0.00006966296471365275, 0.9642007933476302);
        await screenshot_custom(120);
    }

    @testCase
    async setGroups2() {
        this.toggle.isChecked = true;
        EventHandler.emitEvents(this.toggle.checkEvents, this.toggle);
        
        this.slider.progress = 0.02;
        EventHandler.emitEvents(this.slider.slideEvents, this.slider);
        this.camera.setPosition(19, 14, 24);
        this.camera.setRotation(-0.2140622116447128, 0.14430573790058746, 0.03199181188131125, 0.965572238378513);
        await screenshot_custom(30);

        this.slider.progress = 0.5;
        EventHandler.emitEvents(this.slider.slideEvents, this.slider);
        await screenshot_custom(30);

        this.camera.setPosition(72.89037919539744, 69.1681749364538, 122.07584548695787);
        this.camera.setRotation(-0.27354449145630166, 0.014855429665569025, 0.004225300622927272, 0.9617353452161412);
        await screenshot_custom(30);

        this.slider.progress = 1;
        EventHandler.emitEvents(this.slider.slideEvents, this.slider);
        this.camera.setPosition(146.9864671233138, 122.52474055436167, 211.78317084154207);
        this.camera.setRotation(-0.26517307761640896, -0.0002533028105553636, -0.00006966296471365275, 0.9642007933476302);
        await screenshot_custom(120);
    }
}
