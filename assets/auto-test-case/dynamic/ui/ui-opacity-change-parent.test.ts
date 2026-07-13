import { Button, find } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass, beforeClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('ui-opacity-change-parent')
@testClass('UiOpacityChangeParent')
export class UiOpacityChangeParent {
    _dt = 5;
    private prevBtn!: Button;
    private nextBtn!: Button;
    private separateBtn!: Button;
    private resetBtn!: Button;
    private disableBtn!: Button;

    @beforeClass
    async initData() {
        this.prevBtn = find('Canvas/prevButtong')!.getComponent(Button) as Button;
        this.nextBtn = find('Canvas/nextButton')!.getComponent(Button) as Button;
        this.separateBtn = find('Canvas/separate')!.getComponent(Button) as Button;
        this.resetBtn = find('Canvas/reset')!.getComponent(Button) as Button;
        this.disableBtn = find('Canvas/ctrlButton')!.getComponent(Button) as Button;
    }


    @testCase
    async startPlay() {
        await screenshot_custom(this._dt);
        for (let i = 0; i < 3; i++) {
            this.nextBtn?.clickEvents[0].emit([]);
        }
    }

    @testCase
    async prev() {
        for (let i = 0; i < 6; i++) {
            await screenshot_custom(this._dt);
            this.prevBtn?.clickEvents[0].emit([]);
        }
        await screenshot_custom(this._dt);
    }
    @testCase
    async disable() {
        this.disableBtn?.clickEvents[0].emit([{
            currentTarget: this.disableBtn.node, // 手动注入当前节点
            target: this.disableBtn.node,
            type: 'click'
        }]);
        await screenshot_custom(this._dt);
    }
    @testCase
    async next() {
        for (let i = 0; i < 6; i++) {
            this.nextBtn?.clickEvents[0].emit([]);
            await screenshot_custom(this._dt);
        }
    }
    @testCase
    async separate() {
        this.separateBtn?.clickEvents[0].emit([]);
        await screenshot_custom(this._dt);
        this.disableBtn?.clickEvents[0].emit([{
            currentTarget: this.disableBtn.node, // 手动注入当前节点
            target: this.disableBtn.node,
            type: 'click'
        }]);
        await screenshot_custom(10);
    }

    @testCase
    async reset() {
        this.resetBtn?.clickEvents[0].emit([]);
        await screenshot_custom(this._dt);
    }

}