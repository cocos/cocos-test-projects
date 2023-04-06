import { Component, find } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass, beforeClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { RichTextChildState as RichTextChildStateObj } from '../../../cases/ui/07.richtext/rich-text-child-state/rich-text-child-state';
import { screenshot_custom } from '../common/utils';

@runScene('rich-text-child-state')
@testClass('RichTextChildState')
export class RichTextChildState {
    richTextChildState!: RichTextChildStateObj | Component;
    tickTime: number = 60;

    @beforeClass
    initData() {
        this.richTextChildState = find("Canvas")!.getComponent("RichTextChildState")!;
    }
    @testCase
    async start(){
        await screenshot_custom(this.tickTime * 2);
    }

    @testCase
    async hideRichText(){
        this.richTextChildState!.onSetInactive();
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async showRichText(){
        this.richTextChildState!.onSetActive();
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async onUpdateContent(){
        const content = '4554487854532423432434534';
        this.richTextChildState!.onUpdateContent(content);
        await screenshot_custom(this.tickTime);
    }
}