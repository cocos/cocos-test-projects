// @ts-ignore
import { beforeClass, afterClass, testCase, testClass, waitForFrames, expect, srandom } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';
import { Label, find, profiler } from 'cc';

@testClass('WidgetPerformance', 'widget-performance')
export class WidgetPerformance {
    private tip!: Label | null;
    private now!: number;
    private fps: number | undefined = undefined;

    @beforeClass
    async initData() {
        profiler.showStats();
        this.tip = find('canvas/tip')?.getComponent(Label) as Label;
        srandom('widget-performance');
    }

    @afterClass
    async destoryData() {
        profiler.hideStats();
    }

    @testCase
    async startPlay() {
        this.now = performance.now();
        await screenshot_custom();
    }

    @testCase
    async adjustWidget() {
        for (let now2, fps2, i = 0; i < 9; i++) {
            await waitForFrames(29);
            now2 = performance.now();
            fps2 = Math.round(30 / (now2 - this.now) * 1000);
            this.tip!.string = `FPS: ${fps2}`;
            await screenshot_custom();

            if (i > 1 && this.fps !== undefined) {
                expect(Math.abs((fps2 - this.fps) / this.fps)).to.lessThan(0.2, `FPS fluctuates too much! Before: ${this.fps} After:${fps2}`);
            }

            this.now = now2;
            this.fps = fps2;
        }
    }
}