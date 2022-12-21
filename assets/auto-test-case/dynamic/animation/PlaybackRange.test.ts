import { find } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass, sleep } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom,screenshot_custom_by_wait} from '../common/utils';

@runScene('PlaybackRange')
@testClass('PlaybackRange')
export class PlaybackRange {
    _dt = 92
    _delay = 2;

    @testCase
    async startPlay() {
        await screenshot_custom();
    }

    @testCase
    async headLeftRightWalk(){
        // @ts-ignore
        find('scene')!.getComponent('PlaybackRange')!.sliderMin.progress = 0;
        this.setMinLabelString();
        // @ts-ignore
        find('scene')!.getComponent('PlaybackRange')!.sliderMax.progress = 0.3;
        this.setMaxLabelString();
        //head left
        await screenshot_custom(this._dt);
        //head right
        await screenshot_custom_by_wait(82);
        //walk one picture
        await screenshot_custom_by_wait(258);
        //walk two picture
        await screenshot_custom_by_wait(18);

    }


    @testCase
    async walk(){
        // @ts-ignore
        find('scene')!.getComponent('PlaybackRange')!.sliderMin.progress = 0.3;
        this.setMinLabelString();
        // @ts-ignore
        find('scene')!.getComponent('PlaybackRange')!.sliderMax.progress = 0.7;
        this.setMaxLabelString();
        //walk three picture
        await screenshot_custom(this._dt+4);
    }

    @testCase
    async run() {
        // @ts-ignore
        find('scene')!.getComponent('PlaybackRange')!.sliderMin.progress = 0.7;
        this.setMinLabelString();
        // @ts-ignore
        find('scene')!.getComponent('PlaybackRange')!.sliderMax.progress = 1;
        this.setMaxLabelString();
        await screenshot_custom_by_wait(130);
        await screenshot_custom_by_wait(30);
        await screenshot_custom_by_wait(20);
        await screenshot_custom_by_wait(20);
        await screenshot_custom_by_wait(20);
        await screenshot_custom_by_wait(this._dt*3-12);
    }

    //init data
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
