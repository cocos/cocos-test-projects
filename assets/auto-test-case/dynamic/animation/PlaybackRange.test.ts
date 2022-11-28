import { find } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass, sleep } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('PlaybackRange')
@testClass('PlaybackRange')
export class PlaybackRange {
    _dt = 70
    _delay = 2;

    @testCase
    async startPlay() {
        await screenshot_custom();
    }

    @testCase
    async sliderMin_00_Max_00() {
        // @ts-ignore
        find('scene')!.getComponent('PlaybackRange')!.sliderMin.progress = 0;
        this.setMinLabelString();
        // @ts-ignore
        find('scene')!.getComponent('PlaybackRange')!.sliderMax.progress = 0.5;

        this.setMaxLabelString();
        await screenshot_custom(170);
    }

    @testCase
    async sliderMin_00_Max_03() {
        // @ts-ignore
        find('scene')!.getComponent('PlaybackRange')!.sliderMin.progress = 0;
        this.setMinLabelString();
        // @ts-ignore
        find('scene')!.getComponent('PlaybackRange')!.sliderMax.progress = 0.3;

        this.setMaxLabelString();
        for (let i = 0; i < 5; i++) {
            await screenshot_custom(this._dt);
        };
    }



    @testCase
    async sliderMin_03_Max_05() {
        // @ts-ignore
        find('scene')!.getComponent('PlaybackRange')!.sliderMin.progress = 0.3;
        this.setMinLabelString();
        // @ts-ignore
        find('scene')!.getComponent('PlaybackRange')!.sliderMax.progress = 0.7;
        this.setMaxLabelString();
        for (let i = 0; i < 5; i++) {
            await screenshot_custom(this._dt);
        };

    }

    @testCase
    async sliderMin_07_Max_10() {
        // @ts-ignore
        find('scene')!.getComponent('PlaybackRange')!.sliderMin.progress = 0.7;
        this.setMinLabelString();
        // @ts-ignore
        find('scene')!.getComponent('PlaybackRange')!.sliderMax.progress = 1;
        this.setMaxLabelString();
        for (let i = 0; i < 5; i++) {
            await screenshot_custom(this._dt);
        };
    }

    //数据初始化
    getInitData() {
        // @ts-ignore
        let min = find('scene')!.getComponent('PlaybackRange')!.labeledSliderMin.min;
        // @ts-ignore
        let max = find('scene')!.getComponent('PlaybackRange')!.labeledSliderMax.max;
        return [min, max]
    }

    setMaxLabelString() {
        //@ts-ignore
        let integral = find('scene')!.getComponent('PlaybackRange')!.labeledSliderMax.integral;
        // @ts-ignore
        let progress = find('scene')!.getComponent('PlaybackRange')!.sliderMax.progress;
        let [min, max] = this.getInitData();
        const val = min + (max - min) * progress;
        //@ts-ignore
        find('scene')!.getComponent('PlaybackRange')!.labeledSliderMax._valueLabel.string = `${integral ? Math.floor(val) : val}`;
    }

    setMinLabelString() {
        //@ts-ignore
        let integral = find('scene')!.getComponent('PlaybackRange')!.labeledSliderMin.integral;
        // @ts-ignore
        let progress = find('scene')!.getComponent('PlaybackRange')!.sliderMin.progress;
        let [min, max] = this.getInitData();
        const val = min + (max - min) * progress;
        //@ts-ignore
        find('scene')!.getComponent('PlaybackRange')!.labeledSliderMin._valueLabel.string = `${integral ? Math.floor(val) : val}`;
    }
}