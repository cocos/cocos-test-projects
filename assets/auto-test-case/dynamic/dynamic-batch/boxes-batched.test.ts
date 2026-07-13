// @ts-ignore
import { find, Node, director, Slider } from 'cc';
// @ts-ignore
import { testCase, testClass, beforeClass, srandom } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom, screenshot_custom_by_wait } from '../common/utils';
import { FirstPersonCamera } from '../../../shared-res/first-person-camera';
import { UISimulate } from '../common/SimulateEvent';

@testClass('BoxesBatched', 'boxes-batched')
export class BoxesBatched {
    private df = 3;
    private camera!: Node;
    private slider!: Slider;

    @beforeClass
    async initData() {
        this.camera = find('Camera')!;
        this.camera.getComponent(FirstPersonCamera)!.enabled = false;
        srandom(director.getScene()!.name);
    }

    @testCase
    async start() {
        await screenshot_custom();
    }

    @testCase
    async play_0() {
        this.slider = find('New Canvas/New Slider')?.getComponent(Slider)!;
        UISimulate.changeSlider(this.slider, 0);
        await screenshot_custom(this.df);
    }

    @testCase
    async play_03() {
        this.slider = find('New Canvas/New Slider')?.getComponent(Slider)!;
        UISimulate.changeSlider(this.slider, 0.3);
        await screenshot_custom(this.df);
    }

    @testCase
    async play_07() {
        this.slider = find('New Canvas/New Slider')?.getComponent(Slider)!;
        UISimulate.changeSlider(this.slider, 0.7);
        await screenshot_custom(this.df);
    }

    @testCase
    async play_10() {
        this.slider = find('New Canvas/New Slider')?.getComponent(Slider)!;
        UISimulate.changeSlider(this.slider, 1);
        await screenshot_custom(this.df);
    }

    @testCase
    async bigScales(){
        this.camera.setPosition(25, 53.25957722467708, -65.26867933540343);
        await screenshot_custom_by_wait(this.df);
    }

    @testCase
    async mallScale(){
        this.camera.setPosition(25, 110.78681233687337, -223.32345880981984);
        await screenshot_custom_by_wait(this.df);
    }

    @testCase
    async changePosition(){
        this.camera.setPosition(25, 75, -125);
        this.camera.setRotation(0.03010855735649841, -0.9630620921819876, -0.23833377260969213, -0.1216630355103587);
        await screenshot_custom_by_wait(this.df);
    }
}
