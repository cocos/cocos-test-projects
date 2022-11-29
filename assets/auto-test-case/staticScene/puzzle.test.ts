// @ts-ignore
import { runScene, testCase, testClass } from "db://automation-framework/runtime/test-framework.mjs";
import { screenshot_custom } from "../dynamic/common/utils";

@runScene("puzzle")
// @testClass('Puzzle')
export class Puzzle {
    _dt = 10;

    @testCase
    async startPlay() {
        await screenshot_custom(this._dt);
    }
}
