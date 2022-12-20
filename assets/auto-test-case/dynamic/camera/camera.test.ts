// @ts-ignore
import { runScene, testCase, testClass, sleep } from "db://automation-framework/runtime/test-framework.mjs";
import { screenshot_custom, screenshot_custom_by_wait } from "../common/utils";

@runScene("camera")
@testClass("Camera")
export class Camera {
    _delay = 0.5;
    _dt = 60;

    
    @testCase
    async start(){
        await screenshot_custom();
    }

    @testCase
    async play() {
        await screenshot_custom_by_wait(30)
    }

    @testCase
    async playFlipFirst() {
        await screenshot_custom_by_wait(33)
    }

    @testCase
    async playFlipTwo() {
        await screenshot_custom_by_wait(3)
    }
}
