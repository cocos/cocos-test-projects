// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../dynamic/common/utils'
@runScene('multi-canvas')
// @testClass('MultiCanvas')
export class MultiCanvas {
    _dt = 5
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }

    @testCase
    async clickLeftButton() {
        for (let i = 0; i < 5; i++) {
            //@ts-ignore
            find(`Canvas${i}/Button0-${i}`).getComponent('ClickEvent').onButtonClick();
            await screenshot_custom(this._dt)
        }
    }

    @testCase
    async clickRightButton() {
        for (let i = 0; i < 5; i++) {
            //@ts-ignore
            find(`CanvasP${i}/Button1-${i}`).getComponent('ClickEvent').onButtonClick();
            await screenshot_custom(this._dt)
        }
    }
}