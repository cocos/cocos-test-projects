import { EventHandler, Slider, Toggle, find, Node } from 'cc';
// @ts-ignore
import { testCase, testClass, beforeClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';
import { FirstPersonCamera } from '../../../shared-res/first-person-camera';

@testClass('InstancedSkinning', 'instanced-skinning')
export class InstancedSkinning {
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

        this.camera.setPosition(52.63465658321271, 60.38121589561326, 133.55963715600345);
        this.camera.setRotation(-0.3113062069790262, 0.1239248923933014, 0.0409842396632476, 0.9413030110654409);
        await screenshot_custom(30);

        this.slider.progress = 1;
        EventHandler.emitEvents(this.slider.slideEvents, this.slider);
        this.camera.setPosition(71.63802071672357, 83.76808823907238, 162.9151291416415);
        this.camera.setRotation(-0.30070534150326633, 0.0016645492471789884, 0.0005248303616649601, 0.9537154981546118);
        await screenshot_custom(120);
    }

    @testCase
    async setGroups2() {
        this.toggle.isChecked = false;
        EventHandler.emitEvents(this.toggle.checkEvents, this.toggle);
        
        this.slider.progress = 0.02;
        EventHandler.emitEvents(this.slider.slideEvents, this.slider);
        this.camera.setPosition(19, 14, 24);
        this.camera.setRotation(-0.2140622116447128, 0.14430573790058746, 0.03199181188131125, 0.965572238378513);
        await screenshot_custom(30);

        this.slider.progress = 0.5;
        EventHandler.emitEvents(this.slider.slideEvents, this.slider);
        await screenshot_custom(30);

        this.camera.setPosition(52.63465658321271, 60.38121589561326, 133.55963715600345);
        this.camera.setRotation(-0.3113062069790262, 0.1239248923933014, 0.0409842396632476, 0.9413030110654409);
        await screenshot_custom(30);

        this.slider.progress = 1;
        EventHandler.emitEvents(this.slider.slideEvents, this.slider);
        this.camera.setPosition(71.63802071672357, 83.76808823907238, 162.9151291416415);
        this.camera.setRotation(-0.30070534150326633, 0.0016645492471789884, 0.0005248303616649601, 0.9537154981546118);
        await screenshot_custom(120);
    }
}
