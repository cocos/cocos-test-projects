import { find, Toggle, screen, game } from 'cc';
import { captureOneImage, runScene, testCase, testClass, beforeClass, expect, waitForFrames } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';
import { ScreenTest as ScreenTestObj } from "../../../cases/screen-adaptation/screenTest";


@runScene("screenTest")
@testClass("ScreenTest")
export class ScreenTest {

    testData: TestData;
    screenTest: ScreenTestObj;
    toggle: Toggle;


    @beforeClass
    async initData() {
        this.testData = {
            tickTime: 0,
            isChecked: true,
        }

        this.screenTest = find("Canvas")!.getComponent("ScreenTest");
        this.toggle = find("Canvas/Toggle")!.getComponent("cc.Toggle");
    }

    @testCase
    async testFullScreen() {
        this.toggle.isChecked = this.testData.isChecked;
        this.screenTest.onToggle(this.toggle);
        //await expect(screen.fullScreen()).to.equal(true, 'this is full screen');  //it is can't to capture, so this must be used by assert
    }
}

export type TestData = {
    tickTime: number,
    isChecked: boolean,
}