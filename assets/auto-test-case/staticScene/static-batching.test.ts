// @ts-ignore
import { beforeClass, testCase, testClass, expect } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../dynamic/common/utils';
import { Button, director, find, Toggle } from 'cc';
import { UISimulate } from '../dynamic/common/SimulateEvent';

@testClass('StaticBatching', 'static-batching')
export class StaticBatching {
    private addButton!: Button;
    private reduceButton!: Button;
    private batchToggle!: Toggle;
    private df = 60;

    @beforeClass
    async initData() {
        this.addButton = find('New Canvas/batchButton/add')!.getComponent(Button) as Button;
        this.reduceButton = find('New Canvas/batchButton/reduce')!.getComponent(Button) as Button;
        this.batchToggle = find('New Canvas/check/Toggle')!.getComponent(Toggle) as Toggle;
    }

    @testCase
    async startPlay() {
        await screenshot_custom_by_wait(1);
    }

    @testCase
    async add() {
        const drawcall1 = director.root?.device.numDrawCalls;
        UISimulate.changeToggle(this.batchToggle, true);
        await screenshot_custom_by_wait(this.df);
        const drawcall2 = director.root?.device.numDrawCalls;
        expect(drawcall2).to.lessThan(drawcall1! * 0.5, `Click the batch button and the number of drawcalls is not significantly reduced! Before: ${drawcall1} After: ${drawcall2}`);
        
        for (let i=0; i<9; i++) {
            UISimulate.clickButton(this.addButton);
            await screenshot_custom_by_wait(this.df + i * 10);
        }
    }

    @testCase
    async reduce() {
        for (let i=9; i>0; i--) {
            UISimulate.clickButton(this.reduceButton);
            await screenshot_custom_by_wait(this.df + i * 10);
        }

        UISimulate.changeToggle(this.batchToggle, false);
        await screenshot_custom_by_wait(this.df);
    }
}