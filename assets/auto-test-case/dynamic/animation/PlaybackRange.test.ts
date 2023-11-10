import { EventHandler, Label, find } from 'cc';
// @ts-ignore
import { testClass, testCase, beforeClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom, screenshot_custom_by_wait} from '../common/utils';
import { PlaybackRange as CaseComponent } from '../../../cases/animation/scripts/PlaybackRange';

@testClass('PlaybackRange', 'PlaybackRange')
export class PlaybackRange {
    private caseScript!: CaseComponent;
    private max!: number;

    @beforeClass
    async initData() {
        this.caseScript = find('scene')!.getComponent('PlaybackRange') as CaseComponent;
    }

    @testCase
    async startPlay() {
        await screenshot_custom();
    }

    // 0~210
    @testCase
    async headLeftRightWalk(){
        this.max = this.caseScript.labeledSliderMax.max;

        this.setMinLabelString(0);
        this.setMaxLabelString(210/this.max);

        await screenshot_custom_by_wait(92);
        await screenshot_custom_by_wait(82);
    }

    // 210-322
    @testCase
    async walk(){
        this.setMinLabelString(210/this.max);
        this.setMaxLabelString(322/this.max);

        await screenshot_custom_by_wait(10);
        await screenshot_custom_by_wait(40);
        await screenshot_custom_by_wait(55);
    }

    // 322-this.max
    @testCase
    async run() {
        this.setMinLabelString(322/this.max);
        this.setMaxLabelString(1);

        await screenshot_custom_by_wait(10);
        await screenshot_custom_by_wait(30);
        await screenshot_custom_by_wait(20);
        await screenshot_custom_by_wait(20);
        await screenshot_custom_by_wait(20);
        await screenshot_custom_by_wait(20);
    }

    getInitData() {
        let min = this.caseScript.labeledSliderMin.min;
        let max = this.caseScript.labeledSliderMax.max;
        return [min, max]
    }

    setMaxLabelString(value: number) {
        this.caseScript.sliderMax.progress = value;
        EventHandler.emitEvents(this.caseScript.sliderMax.slideEvents, this.caseScript.sliderMax);
        this.caseScript.sliderMax.node.emit('slide', this.caseScript.sliderMax);
    }

    setMinLabelString(value: number) {
        this.caseScript.sliderMin.progress = value;
        EventHandler.emitEvents(this.caseScript.sliderMin.slideEvents, this.caseScript.sliderMin);
        this.caseScript.sliderMin.node.emit('slide', this.caseScript.sliderMin);
    }
}
