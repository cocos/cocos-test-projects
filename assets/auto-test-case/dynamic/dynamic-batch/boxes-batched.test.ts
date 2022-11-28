// @ts-ignore
import { find } from "cc";
// @ts-ignore
import { runScene, testCase, testClass } from "db://automation-framework/runtime/test-framework.mjs";
import { screenshot_custom } from "../common/utils";

@runScene("boxes-batched")
@testClass("BoxesBatched")
export class BoxesBatched {
    _dt = 3;

    @testCase
    async start() {
        await screenshot_custom();
    }

    @testCase
    async play_0() {
        //@ts-ignore
        find("New Canvas/New Slider").getComponent("cc.Slider").progress = 0;
        //@ts-ignore
        find("Camera").getComponent("BatchTester").setCount(find("New Canvas/New Slider").getComponent("cc.Slider"));
        await screenshot_custom(this._dt);
    }

    @testCase
    async play_05() {
        //@ts-ignore
        find("New Canvas/New Slider").getComponent("cc.Slider").progress = 0.3;
        //@ts-ignore
        find("Camera").getComponent("BatchTester").setCount(find("New Canvas/New Slider").getComponent("cc.Slider"));
        await screenshot_custom(this._dt);
    }

    @testCase
    async play_07() {
        //@ts-ignore
        find("New Canvas/New Slider").getComponent("cc.Slider").progress = 0.7;
        //@ts-ignore
        find("Camera").getComponent("BatchTester").setCount(find("New Canvas/New Slider").getComponent("cc.Slider"));
        await screenshot_custom(this._dt);
    }

    @testCase
    async play_10() {
        //@ts-ignore
        find("New Canvas/New Slider").getComponent("cc.Slider").progress = 1;
        //@ts-ignore
        find("Camera").getComponent("BatchTester").setCount(find("New Canvas/New Slider").getComponent("cc.Slider"));
        await screenshot_custom(this._dt);
    }
}
