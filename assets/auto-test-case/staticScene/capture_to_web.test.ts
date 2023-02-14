// @ts-ignore
import { runScene, testCase, testClass, sleep } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../dynamic/common/utils'

@runScene('capture_to_web')
@testClass('CaptureToWeb')
export class CaptureToWeb {
    _dt = 3;

    @testCase
    async startPlay() {
        //截取第一张模糊图片
        await screenshot_custom(this._dt);
        //截取变化后的清晰图片
        await sleep(this._dt);
        await screenshot_custom(this._dt);
    }
}