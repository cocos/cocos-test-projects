import { Button, Component, find } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass, beforeClass, waitForFrames } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('widget-destroy')
@testClass('WidgetDestroy')
export class WidgetDestroy {
    createButton!:Button | Component ;
    delButton!:Button | Component;
    moveButton!:Button | Component;
    tickTime: number = 60;

    @beforeClass
    async initData(){
        this.createButton = find("Canvas/create button")!.getComponent("cc.Button")!;
        this.delButton = find("Canvas/del button")!.getComponent("cc.Button")!;
        this.moveButton = find("Canvas/move button")!.getComponent("cc.Button")!;
    }

    @testCase
    async startPlay() {
        await screenshot_custom(1);
    }

    @testCase
    async createCoinAndDeleteButton(){
        this.createButton.clickEvents[0].emit([]) ;
        await waitForFrames(this.tickTime);
        this.createButton.clickEvents[0].emit([]);
        await waitForFrames(this.tickTime);
        this.delButton.clickEvents[0].emit([]);
        await screenshot_custom(this.tickTime);
    }
    

    @testCase
    async clickMoveButton(){
        //TODO: testlist enter test case can't testing by automation
        this.createButton.clickEvents[0].emit([]);
        await waitForFrames(this.tickTime);
        this.moveButton.clickEvents[0].emit([]);
        await waitForFrames(this.tickTime);
        await screenshot_custom(this.tickTime);
    }
}