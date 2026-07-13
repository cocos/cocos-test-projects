// @ts-ignore
import { EventHandler, find, Node, Slider } from 'cc';
// @ts-ignore
import { testCase, testClass, beforeClass, srandom } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@testClass('Bloom', 'bloom')
export class Bloom {
    private df = 60;
    private slider!: Slider;

    @beforeClass
    async initData() {
        this.slider = find('Canvas/Slider')?.getComponent(Slider)!;
    }

    @testCase
    async start() {
        await screenshot_custom(this.df);
    }

    @testCase
    async play() {
    if (!this.slider) {
        console.error('Slider component not found!');
        return;
    } else {
        console.log('Slider component found!');
        const values: number[] = [0, 0.3, 0.7, 1];
        for (const value of values) {
            this.slider.progress = value;
            EventHandler.emitEvents(this.slider.slideEvents, this.slider);
            await screenshot_custom(this.df);
        }
    }
    
}

}
