import { find, Node } from 'cc';
// @ts-ignore
import { testCase, testClass, beforeClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';
import { simulateTouchEnd, simulateTouchStart } from '../common/SimulateEvent';

@testClass('WidgetDestroy', 'widget-destroy')
export class WidgetDestroy {
    createButton!: Node | null;
    delButton!: Node | null;
    moveButton!: Node | null;

    @beforeClass
    async initData() {
        this.createButton = find("Canvas/create button");
        this.delButton = find("Canvas/del button");
        this.moveButton = find("Canvas/move button");
    }

    @testCase
    async startPlay() {
        await screenshot_custom(1);
    }

    @testCase
    async clickCreate() {
        for (let i=0; i<3; i++) {
            simulateTouchStart(0, 0, this.createButton!);
            simulateTouchEnd(this.createButton!);
            await screenshot_custom(40);
        }
    }

    @testCase
    async clickDelButton() {
        simulateTouchStart(0, 0, this.delButton!);
        simulateTouchEnd(this.delButton!);
        await screenshot_custom(40);
    }

    @testCase
    async clickMoveButton() {
        simulateTouchStart(0, 0, this.moveButton!);
        simulateTouchEnd(this.moveButton!);
        await screenshot_custom(40);
    }
}