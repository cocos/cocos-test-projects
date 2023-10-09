import { find } from 'cc';
// @ts-ignore
import { testCase, testClass, beforeClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { RichTextChildState } from '../../../cases/ui/07.richtext/rich-text-child-state/rich-text-child-state';
import { screenshot_custom } from '../common/utils';

@testClass('RichTextChildStateTest', 'rich-text-child-state')
export class RichTextChildStateTest {
    private richTextChildState!: RichTextChildState;
    private df = 2;

    @beforeClass
    initData() {
        this.richTextChildState = find("Canvas")!.getComponent(RichTextChildState)!;
    }

    @testCase
    async start() {
        await screenshot_custom(this.df);
    }

    @testCase
    async hideRichText() {
        this.richTextChildState!.onSetInactive();
        await screenshot_custom(this.df);
    }

    @testCase
    async showRichText() {
        this.richTextChildState!.onSetActive();
        await screenshot_custom(this.df);
    }

    @testCase
    async onUpdateContent() {
        this.richTextChildState!.onUpdateContent(null, '4554487854532423432434534');
        await screenshot_custom(this.df);
    }
}