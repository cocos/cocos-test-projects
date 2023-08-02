// @ts-ignore
import { beforeClass, testCase, testClass, expect } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../dynamic/common/utils';
import { Button, director, find, Toggle } from 'cc';
import { StaticBatcher } from '../../cases/scene/dynamic-batch/static-batcher';

@testClass('StaticBatching', 'static-batching')
export class StaticBatching {
    private caseScript!: StaticBatcher;
    private addButtonNode!: Button;
    private reduceButtonNode!: Button;
    private batchToggle!: Toggle;

    @beforeClass
    async initData() {
        this.caseScript = find('Camera')?.getComponent(StaticBatcher) as StaticBatcher;
        this.addButtonNode = find('New Canvas/batchButton/add')!.getComponent(Button) as Button;
        this.addButtonNode = find('New Canvas/batchButton/reduce')!.getComponent(Button) as Button;
        this.batchToggle = find('New Canvas/check/Toggle')!.getComponent(Toggle) as Toggle;
    }

    @testCase
    async startPlay() {
        await screenshot_custom_by_wait(1);
    }

    @testCase
    async batch300() {
        this.clickButton(this.addButtonNode, 2, 'add');
        await screenshot_custom_by_wait(10);

        const drawcall1 = director.root?.device.numDrawCalls;
        this.changeToggle(true);
        await screenshot_custom_by_wait(10);
        const drawcall2 = director.root?.device.numDrawCalls;
        expect(drawcall2).to.lessThan(drawcall1! * 0.5, `点击 batch 按钮，drawcall 数量没有明显减少！前：${drawcall1} 后：${drawcall2}`);
    }

    @testCase
    async batch500() {
        this.clickButton(this.addButtonNode, 2, 'add');
        this.changeToggle(false);
        await screenshot_custom_by_wait(10);

        const drawcall1 = director.root?.device.numDrawCalls;
        this.changeToggle(true);
        await screenshot_custom_by_wait(10);
        const drawcall2 = director.root?.device.numDrawCalls;
        expect(drawcall2).to.lessThan(drawcall1! * 0.5, `点击 batch 按钮，drawcall 数量没有明显减少！前：${drawcall1} 后：${drawcall2}`);
    }

    @testCase
    async reduce() {
        const drawcall1 = director.root?.device.numDrawCalls;
        this.clickButton(this.addButtonNode, 1, 'add');
        await screenshot_custom_by_wait(10);

        this.clickButton(this.reduceButtonNode, 1);
        await screenshot_custom_by_wait(10);
        const drawcall2 = director.root?.device.numDrawCalls;

        expect(drawcall2).to.equal(drawcall1, `增减一次 box 数量，观察 batch 下 drawcall 是否数值和上一次一致：结果不一致！前：${drawcall1} 后：${drawcall2}`);
    }

    clickButton(btn: Button, count: number = 1, customData: string = '') {
        for (let i=0; i<count; i++) {
            this.caseScript.setCount(btn, customData);
        }
    }

    changeToggle(value: boolean) {
        this.batchToggle.isChecked = value;
        this.caseScript.useBatch(this.batchToggle);
    }

}