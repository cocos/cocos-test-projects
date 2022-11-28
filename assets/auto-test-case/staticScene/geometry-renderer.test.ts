// @ts-ignore
import { runScene, testCase, testClass, sleep } from "db://automation-framework/runtime/test-framework.mjs";
import { screenshot_custom } from "../dynamic/common/utils";

@runScene("geometry-renderer")
// @testClass('GeometryRenderer')
export class GeometryRenderer {
    dt = 50;
    _delay = 5;

    @testCase
    async startPlay() {
        await sleep(this._delay);
        await screenshot_custom(this.dt);
    }
}
