import { Button, Slider, Toggle, director, find } from 'cc';
// @ts-ignore
import { beforeClass, testCase, testClass, srandom } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';
import { UISimulate } from '../common/SimulateEvent';

@testClass('UIModel', 'uimodel')
export class UIModel {
    private df = 30;
    private btnModel!: Button;
    private btnParticle!: Button;

    @beforeClass
    async initData() {
        this.btnModel = find('Canvas/model')?.getComponent(Button) as Button;
        this.btnParticle = find('Canvas/particle')?.getComponent(Button) as Button;
        srandom(director.getScene()!.name);
    }

    @testCase
    async startPlay() {
        await screenshot_custom(2);
    }

    @testCase
    async play() {
        UISimulate.clickButton(this.btnModel);
        await screenshot_custom(this.df);

        UISimulate.clickButton(this.btnParticle);
        await screenshot_custom(this.df * 2);
        
        UISimulate.clickButton(this.btnModel);
        await screenshot_custom(this.df);

        UISimulate.clickButton(this.btnParticle);
        await screenshot_custom(this.df);
    }
}