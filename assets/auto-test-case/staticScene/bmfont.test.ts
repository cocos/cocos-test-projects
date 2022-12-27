// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../dynamic/common/utils'
import { find } from 'cc'

@runScene('bmfont')
@testClass('Bmfont')
export class Bmfont {
    _dt = 10;
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }

    @testCase
    async returnOneGold() {
        for(let i=0;i<11;i++){
            //@ts-ignore
            find('Canvas/gold').getComponent('gold').onButton()
            await screenshot_custom(this._dt)
        }
       
    }
}