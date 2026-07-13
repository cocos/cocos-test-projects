// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../dynamic/common/utils';
import { find } from 'cc';

@runScene('mask-inverted-event')
@testClass('MaskInvertedEvent')
export class MaskInvertedEvent {
    _dt = 10;
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }

    @testCase
    async clickArea() {
        //@ts-ignore
        find("Canvas/area").getComponent('MaskInvertedEvent').callback();
        await screenshot_custom(this._dt);
    }

    @testCase
    async clickSp() {
        //@ts-ignore
        find("Canvas/sp").getComponent('MaskInvertedEvent').callback()
        await screenshot_custom(this._dt);
    }

    @testCase
    async clickMaskSp() {
        //@ts-ignore
        find("Canvas/mask/sp2").getComponent('MaskInvertedEvent').callback()
        await screenshot_custom(this._dt);
    }
}