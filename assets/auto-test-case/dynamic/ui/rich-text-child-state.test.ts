import { Component, find } from 'cc';
// @ts-ignore
import { testCase, testClass, beforeClass, srandom } from 'db://automation-framework/runtime/test-framework.mjs';
import { RichTextChildState as RichTextChildStateObj } from '../../../cases/ui/07.richtext/rich-text-child-state/rich-text-child-state';
import { screenshot_custom } from '../common/utils';

@testClass('RichTextChildState', 'rich-text-child-state')
export class RichTextChildState {
    richTextChildState!: RichTextChildStateObj;
    tickTime: number = 60;

    @beforeClass
    initData() {
        this.richTextChildState = find("Canvas")!.getComponent("RichTextChildState")! as RichTextChildStateObj;
        srandom('rich-text-child-state');
    }
    @testCase
    async start() {
        await screenshot_custom(this.tickTime * 2);
    }

    @testCase
    async hideRichText() {
        this.richTextChildState!.onSetInactive();
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async showRichText() {
        this.richTextChildState!.onSetActive();
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async onUpdateContent() {
        this.richTextChildState!.onUpdateContent();
        await screenshot_custom(this.tickTime);
    }
}