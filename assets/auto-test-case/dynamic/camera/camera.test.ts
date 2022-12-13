// @ts-ignore
import { runScene, testCase, testClass, sleep } from "db://automation-framework/runtime/test-framework.mjs";
import { screenshot_custom } from "../common/utils";

@runScene("camera")
//@testClass("Camera")
export class Camera {
    _delay = 0.5;
    _dt = 10;

    
    @testCase
    async start(){
        await screenshot_custom(this._dt);
    }

    @testCase
    async play() {
        for (let i = 0; i < 10; i++) {
            await screenshot_custom(this._dt+50);
        }
    }
}
