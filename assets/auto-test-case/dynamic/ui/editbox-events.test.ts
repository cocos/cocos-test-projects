import { Component, EditBox, find } from 'cc';
// @ts-ignore
import { captureOneImage, runScene, testCase, testClass, beforeClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { EditboxEvent } from '../../../cases/ui/12.editbox/editbox-event';
import { screenshot_custom } from '../common/utils';

new EditboxEvent()
@runScene('editbox-events')
@testClass('EditboxEvents')
export class EditboxEvents {
    tickTime: number = 5;
    editboxEvent!: EditboxEvent| Component;
    box!:any;

    @beforeClass
    async start(){
        // @ts-ignore
        this.editboxEvent = find("Canvas/ctrl").getComponent("EditboxEvent")!;
        this.box =  find("Canvas/eventedit/New EditBox")!.getComponent("cc.EditBox")!;
    }

    @testCase
    async startPlay() {
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async begin() {
        this.editboxEvent.editBegan(this.box,"beginning");
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async input() {
        this.editboxEvent.editInputing("input string",this.box,"input");
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async editReturn() {
        this.editboxEvent.editReturn(this.box,"return");
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async end() {
        this.editboxEvent.editEnd(this.box,"end");
        await screenshot_custom(this.tickTime);
    }
}