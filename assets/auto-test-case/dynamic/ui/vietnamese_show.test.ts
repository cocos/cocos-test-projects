import { find, Button, Component, ScrollView } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass, beforeClass, waitForFrames, expect } from 'db://automation-framework/runtime/test-framework.mjs';
import { VietnameseText } from '../../../cases/ui/02.label/vietnamese/VietnameseText';
import { Test } from '../../../cases/ui/17.sprite-atlas/TS/Test';
import { screenshot_custom } from '../common/utils';

@testClass('VietnameseShow', 'vietnamese-show')
export class VietnameseShow {
    _dt = 30;

    testScript!: VietnameseText | null;

    @beforeClass
    async initData() {
        this.testScript = find('Canvas')?.getComponent(VietnameseText) as VietnameseText;
    }

    @testCase
    async start() {
        expect(this.testScript).to.not.be.a('null');

        let num = 10;
        while (!this.testScript!.isLoadButton && num > 0) {
            num -= 1;
            await waitForFrames(60);
        }

        expect(this.testScript!.isLoadButton).to.equal(true);

        await screenshot_custom(this._dt);

        const btns = this.testScript!.btnContainer.children;
        const scrollView = find('Canvas/ScrollView')!.getComponent(ScrollView)!;
        for (let i = 1; i < btns.length; i++) {
            let ele = btns[i];
            ele.emit(Button.EventType.CLICK);
            await waitForFrames(1);
            await screenshot_custom(this._dt);

            if (i === 1 || i === 8) {
                scrollView.scrollToBottom(0);
                await waitForFrames(1);
                await screenshot_custom(this._dt);
            }
        }
    }
}