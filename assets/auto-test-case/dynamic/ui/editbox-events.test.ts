import { Component, EditBox, EventKeyboard, EventTouch, Input, KeyCode, find, game, input, Touch } from 'cc';
// @ts-ignore
import { captureOneImage, runScene, testCase, testClass, beforeClass, waitForFrames } from 'db://automation-framework/runtime/test-framework.mjs';
import { EditboxEvent } from '../../../cases/ui/12.editbox/editbox-event';
import { screenshot_custom } from '../common/utils';
import { simulateTouchEnd, simulateTouchStart } from '../common/SimulateEvent';

@testClass('EditboxEvents', 'editbox-events')
export class EditboxEvents {
    private editBox!: EditBox;
    private df = 5;

    @beforeClass
    async initData(){
        this.editBox =  find("Canvas/eventedit/New EditBox")!.getComponent(EditBox)!;
    }

    @testCase
    async startPlay() {
        await screenshot_custom(this.df);
    }

    @testCase
    async begin() {
        this.editBox.focus();
        await screenshot_custom(this.df);
    }

    @testCase
    async input() {
        this.editBox.string = 'AW34$5中';
        this.editBox._showLabels();
        this.editBox._editBoxTextChanged('AW34$5中');
        await screenshot_custom(this.df);
    }

    @testCase
    async return() {
        this.editBox.blur();
        this.editBox._showLabels();
        this.editBox._editBoxEditingReturn('AW34$5中');
        await screenshot_custom(this.df);
    }

    @testCase
    async end() {
        this.editBox.focus();
        this.editBox.blur();
        this.editBox._showLabels();
        this.editBox._editBoxEditingDidEnded('AW34$5中');
        await screenshot_custom(this.df);
    }
}