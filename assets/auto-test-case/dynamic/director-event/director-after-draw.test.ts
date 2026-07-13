// @ts-ignore
import { runScene, testCase, testClass, sleep } from "db://automation-framework/runtime/test-framework.mjs";
import { screenshot_custom_by_wait } from "../common/utils";

@runScene("director-after-draw-test")
@testClass("DirectorAfterDrawTest")
export class DirectorAfterDrawTest {
    @testCase
    async start() {
        await screenshot_custom_by_wait(2);
        await screenshot_custom_by_wait(62);
    }
}
