import { find } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass, sleep } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('SwitchAnimation')
@testClass('SwitchAnimation')
export class SwitchAnimation {
    _dt = 20;
    _delay = 2;

    @testCase
    async startPlay() {
        await screenshot_custom(this._dt);
    }

    @testCase
    async switch_00() {
        // @ts-ignore
        find('Canvas/switch/Slider').getComponent('cc.Slider').progress = 0;
        // @ts-ignore
        find('scene').getComponent('SwitchAnimation').onDurationEditBoxChange(find('Canvas/switch/Slider').getComponent('cc.Slider'));
        // @ts-ignore
        find('scene')!.getComponent('SwitchAnimation')!.switch();
        for (let i = 0; i < 5; i++) {
            await screenshot_custom(this._dt);
        };
    }

    @testCase
    async switch_05() {
        // @ts-ignore
        find('Canvas/switch/Slider').getComponent('cc.Slider').progress = 0.5;
        // @ts-ignore
        find('scene').getComponent('SwitchAnimation').onDurationEditBoxChange(find('Canvas/switch/Slider').getComponent('cc.Slider'));
        // @ts-ignore
        find('scene')!.getComponent('SwitchAnimation')!.switch();
        for (let i = 0; i < 5; i++) {
            await screenshot_custom(this._dt);
        };
    }


    @testCase
    async switch_10() {
        // @ts-ignore
        find('Canvas/switch/Slider').getComponent('cc.Slider').progress = 1;
        // @ts-ignore
        find('scene').getComponent('SwitchAnimation').onDurationEditBoxChange(find('Canvas/switch/Slider').getComponent('cc.Slider'));
        // @ts-ignore
        find('scene')!.getComponent('SwitchAnimation')!.switch();
        for (let i = 0; i < 4; i++) {
            await screenshot_custom(this._dt * 3);
        };
    }
}