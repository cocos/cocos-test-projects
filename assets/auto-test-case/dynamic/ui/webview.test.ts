import { Component, EditBox, EventKeyboard, EventTouch, Input, KeyCode, find, game, input, Touch, WebView } from 'cc';
// @ts-ignore
import { captureOneImage, runScene, testCase, testClass, beforeClass, waitForFrames } from 'db://automation-framework/runtime/test-framework.mjs';
import { EditboxEvent } from '../../../cases/ui/12.editbox/editbox-event';
import { screenshot_custom } from '../common/utils';
import { simulateTouchEnd, simulateTouchStart } from '../common/SimulateEvent';

@testClass('WebviewTest', 'webview')
export class WebviewTest {
    private webview!: WebView;
    private df = 2;

    @beforeClass
    async initData(){
        this.webview =  find("Canvas/webview")!.getComponent(WebView)!;
    }

    @testCase
    async loading() {
        await screenshot_custom(this.df);
    }

    @testCase
    async loaded() {
        await this.waitLoaded();
        await screenshot_custom(this.df);
    }
    
    @testCase
    async clickLoaded() {
        const btn = find('Canvas/Button')!;
        simulateTouchStart(0, 0, btn);
        await waitForFrames(1);
        simulateTouchEnd(btn, 0, 0);
        await this.waitLoaded();
        await screenshot_custom(this.df);
    }

    async waitLoaded(): Promise<void> {
        return new Promise((resolve)=>{
            this.webview.node.once(WebView.EventType.LOADED, () => {
                resolve();
            });
            this.webview.node.once(WebView.EventType.ERROR, () => {
                resolve();
            });
        });
    }
}