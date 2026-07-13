import { find } from 'cc';
// @ts-ignore
import { beforeClass, expect, captureOneImage, waitForFrames, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@testClass('RichText', 'rich-text')
export class RichText {

    private caseScript: any;

    @beforeClass
    async initData() {
        // @ts-ignore
        this.caseScript = find('Canvas/Layout/<img>').getComponent('RichTextEvent');
        expect(this.caseScript).to.not.be.a('null');
    }

    @testCase
    async startPlay() {
        await waitForFrames();
        await captureOneImage();
    }

    @testCase
    async onSingleClick() {
        this.caseScript.onClick();
        await waitForFrames(20);
        await captureOneImage();
    }

    @testCase
    async onDoubleClick() {
        this.caseScript.onClick();
        await waitForFrames(20);
        this.caseScript.onClick();
        await waitForFrames(20);
        await captureOneImage();
    }

    @testCase
    async end() {
        await waitForFrames(300);
        await captureOneImage();
    }
}