import { Button, Slider, Toggle, find } from 'cc';
// @ts-ignore
import { beforeClass, testCase, testClass, srandom } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';
import { UISimulate } from '../common/SimulateEvent';

@testClass('ParticleForce', 'particle-force')
export class ParticleForce {
    private df = 10;
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
        srandom('particle-force');
    }

    @testCase
    async startPlay() {
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this.df);
        }
    }

    @testCase
    async onTranslateChanged_05() {
        UISimulate.changeSlider(this.translateSlider, 0.5);
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this.df);
        }
    }

    @testCase
    async onTranslateChanged_10() {
        UISimulate.changeSlider(this.translateSlider, 1);
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this.df);
        }
    }

    @testCase
    async onTranslateChanged_00() {
        UISimulate.changeSlider(this.translateSlider, 0);
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this.df);
        }
    }

    @testCase
    async onRotateChanged_05() {
        UISimulate.changeSlider(this.rotateSlider, 0.5);
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this.df);
        }
    }

    @testCase
    async onRotateChanged_10() {
        UISimulate.changeSlider(this.rotateSlider, 1);
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this.df);
        }
    }

    @testCase
    async onRotateChanged_00() {
        UISimulate.changeSlider(this.rotateSlider, 0);
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this.df);
        }
    }

    @testCase
    async unChecked() {
        UISimulate.changeToggle(this.toggle1, false);
        UISimulate.changeToggle(this.toggle2, false);
        UISimulate.changeToggle(this.toggle3, false);
        UISimulate.changeToggle(this.toggle4, false);

        UISimulate.changeSlider(this.translateSlider, 1);
        UISimulate.changeSlider(this.rotateSlider, 1);

        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this.df);
        }
    }


    @testCase
    async Checked() {
        UISimulate.changeToggle(this.toggle1, true);
        UISimulate.changeToggle(this.toggle2, true);
        UISimulate.changeToggle(this.toggle3, true);
        UISimulate.changeToggle(this.toggle4, true);

        UISimulate.changeSlider(this.translateSlider, 1);
        UISimulate.changeSlider(this.rotateSlider, 1);

        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this.df);
        }
    }

    @testCase
    async click_F() {
        for (let k=0; k<3; k++) {
            UISimulate.clickButton(find('New Canvas/Pad/Direction/Forward')?.getComponent(Button)!);
        }
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this.df);
        }
    }

    @testCase
    async click_B() {
        for (let k=0; k<3; k++) {
            UISimulate.clickButton(find('New Canvas/Pad/Direction/Back')?.getComponent(Button)!);
        }
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this.df);
        }
    }

    @testCase
    async click_L() {
        for (let k=0; k<3; k++) {
            UISimulate.clickButton(find('New Canvas/Pad/Direction/Left')?.getComponent(Button)!);
        }
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this.df);
        }
    }

    @testCase
    async click_R() {
        for (let k=0; k<3; k++) {
            UISimulate.clickButton(find('New Canvas/Pad/Direction/Right')?.getComponent(Button)!);
        }
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this.df);
        }
    }

    @testCase
    async click_U() {
        for (let k=0; k<3; k++) {
            UISimulate.clickButton(find('New Canvas/Pad/ViewDir/Up')?.getComponent(Button)!);
        }
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this.df);
        }
    }

    @testCase
    async click_D() {
        for (let k=0; k<3; k++) {
            UISimulate.clickButton(find('New Canvas/Pad/ViewDir/Down')?.getComponent(Button)!);
        }
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this.df);
        }
    }

    @testCase
    async click_RL() {
        for (let k=0; k<3; k++) {
            UISimulate.clickButton(find('New Canvas/Pad/ViewDir/Left')?.getComponent(Button)!);
        }
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this.df);
        }
    }

    @testCase
    async click_RR() {
        for (let k=0; k<3; k++) {
            UISimulate.clickButton(find('New Canvas/Pad/ViewDir/Right')?.getComponent(Button)!);
        }
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this.df);
        }
    }
}