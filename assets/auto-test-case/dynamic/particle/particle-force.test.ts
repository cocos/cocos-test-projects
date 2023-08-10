import { Node, Button, Slider, Toggle, director, find } from 'cc';
// @ts-ignore
import { beforeClass, testCase, testClass, srandom } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';
import { UISimulate, simulateTouchEnd, simulateTouchStart } from '../common/SimulateEvent';

@testClass('ParticleForce', 'particle-force')
export class ParticleForce {
    private df = 30;
    private translateSlider!: Slider;
    private rotateSlider!: Slider;
    private toggle1!: Toggle;
    private toggle2!: Toggle;
    private toggle3!: Toggle;
    private toggle4!: Toggle;

    @beforeClass
    async initData() {
        this.translateSlider = find('New Canvas/translate')?.getComponent(Slider) as Slider;
        this.rotateSlider = find('New Canvas/rotate')?.getComponent(Slider) as Slider;
        this.toggle1 = find('New Canvas/1')?.getComponent(Toggle) as Toggle;
        this.toggle2 = find('New Canvas/2')?.getComponent(Toggle) as Toggle;
        this.toggle3 = find('New Canvas/3')?.getComponent(Toggle) as Toggle;
        this.toggle4 = find('New Canvas/4')?.getComponent(Toggle) as Toggle;
        srandom(director.getScene()!.name);
    }

    @testCase
    async startPlay() {
        await screenshot_custom(this.df);
    }

    @testCase
    async play() {
        UISimulate.changeSlider(this.translateSlider, 0.5);
        await screenshot_custom(this.df);

        UISimulate.changeSlider(this.translateSlider, 1);
        await screenshot_custom(this.df);

        UISimulate.changeSlider(this.translateSlider, 0);

        UISimulate.changeSlider(this.rotateSlider, 0.5);
        await screenshot_custom(this.df);

        UISimulate.changeSlider(this.rotateSlider, 1);
        await screenshot_custom(this.df);

        UISimulate.changeSlider(this.rotateSlider, 0);

        for (let i=0; i<2; i++) {
            if (i === 1) {
                UISimulate.changeToggle(this.toggle1, false);
                UISimulate.changeToggle(this.toggle2, false);
                UISimulate.changeToggle(this.toggle3, false);
                UISimulate.changeToggle(this.toggle4, false);
            }

            await this.simulateTouchAndScreenshot(find('New Canvas/Pad/Direction/Forward')?.getComponent(Button)!);
            await this.simulateTouchAndScreenshot(find('New Canvas/Pad/Direction/Back')?.getComponent(Button)!);
            await this.simulateTouchAndScreenshot(find('New Canvas/Pad/Direction/Left')?.getComponent(Button)!);
            await this.simulateTouchAndScreenshot(find('New Canvas/Pad/Direction/Right')?.getComponent(Button)!);
            await this.simulateTouchAndScreenshot(find('New Canvas/Pad/ViewDir/Up')?.getComponent(Button)!);
            await this.simulateTouchAndScreenshot(find('New Canvas/Pad/ViewDir/Down')?.getComponent(Button)!);
            await this.simulateTouchAndScreenshot(find('New Canvas/Pad/ViewDir/Left')?.getComponent(Button)!);
            await this.simulateTouchAndScreenshot(find('New Canvas/Pad/ViewDir/Right')?.getComponent(Button)!);
        }
    }

    private async simulateTouchAndScreenshot(button: Button) {
        for (let k=0; k<2; k++) {
            UISimulate.clickButton(button);
        }
        simulateTouchStart(10, 10, button.node);
        await screenshot_custom(this.df);
        simulateTouchEnd(button.node);
    }
}