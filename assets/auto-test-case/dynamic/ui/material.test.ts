import { EventHandler, Slider, Toggle, find } from 'cc';
// @ts-ignore
import { beforeClass, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';
import { UISimulate } from '../common/SimulateEvent';

@testClass('Material', 'material')
export class Material {
    _dt = 5;
    cullFaceToggle!: Toggle;
    albedoToggle!: Toggle;
    albedoSlider!: Slider;
    metallicToggle!: Toggle;
    alphaTestToggle!: Toggle;
    metallicSlider!: Slider;
    alphaThresholdSlider!: Slider;

    @beforeClass
    async initData() {
        this.cullFaceToggle = find('Canvas/CullFace/Toggle')?.getComponent(Toggle)!;
        this.albedoToggle = find('Canvas/Albedo/Toggle')?.getComponent(Toggle)!;
        this.albedoSlider = find('Canvas/Albedo/manual albedo/Slider')?.getComponent(Slider)!;
        this.metallicToggle = find('Canvas/Metallic/Toggle')?.getComponent(Toggle)!;
        this.metallicSlider = find('Canvas/Metallic/manual metallic/Slider')?.getComponent(Slider)!;
        this.alphaTestToggle = find('Canvas/AlphaTest/Toggle')?.getComponent(Toggle)!;
        this.alphaThresholdSlider = find('Canvas/AlphaTest/manual alpha test/Slider')?.getComponent(Slider)!;
    }
    
    @testCase
    async startPlay() {
        await screenshot_custom(0);
    }

    @testCase
    async useAlbedoMap_False() {
        UISimulate.changeToggle(this.albedoToggle, false);
        await screenshot_custom(this._dt);

        UISimulate.changeSlider(this.albedoSlider, 0);
        await screenshot_custom(this._dt);

        UISimulate.changeSlider(this.albedoSlider, 0.5);
        await screenshot_custom(this._dt);

        UISimulate.changeSlider(this.albedoSlider, 1);
        await screenshot_custom(this._dt);
    }

    @testCase
    async useAlbedoMap_True() {
        UISimulate.changeToggle(this.albedoToggle, true);
        await screenshot_custom(this._dt);
    }

    @testCase
    async useMetallicMap_False() {
        UISimulate.changeToggle(this.metallicToggle, false);
        await screenshot_custom(this._dt);

        UISimulate.changeSlider(this.metallicSlider, 0);
        await screenshot_custom(this._dt);

        UISimulate.changeSlider(this.metallicSlider, 0.5);
        await screenshot_custom(this._dt);

        UISimulate.changeSlider(this.metallicSlider, 1);
        await screenshot_custom(this._dt);
    }

    @testCase
    async useMetallicMap_True() {
        UISimulate.changeToggle(this.metallicToggle, true);
        await screenshot_custom(this._dt);
    }

    @testCase
    async useAlphaTest_True() {
        UISimulate.changeToggle(this.alphaTestToggle, true);
        await screenshot_custom(this._dt);

        UISimulate.changeSlider(this.alphaThresholdSlider, 0);
        await screenshot_custom(this._dt);

        UISimulate.changeSlider(this.alphaThresholdSlider, 0.5);
        await screenshot_custom(this._dt);

        UISimulate.changeSlider(this.alphaThresholdSlider, 1);
        await screenshot_custom(this._dt);
    }

    @testCase
    async useAlphaTest_False() {
        UISimulate.changeToggle(this.alphaTestToggle, false);
        await screenshot_custom(this._dt);
    }

    @testCase
    async cullFrontFace_FRONT() {
        UISimulate.changeToggle(this.cullFaceToggle, true);
        await screenshot_custom(this._dt);
    }

    @testCase
    async cullFrontFace_BACK() {
        UISimulate.changeToggle(this.cullFaceToggle, false);
        await screenshot_custom(this._dt);
    }
}