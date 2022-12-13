// @ts-ignore
import { captureOneImage, runScene, sleep, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('graphics-line-join')
@testClass('GraphicsLineJoin')
export class GraphicsLineJoin {
    _dt = 2;

    @testCase
    async index() {
        await screenshot_custom(this._dt);
    }


    @testCase
    async play() {
        for (let i = 0; i < 5; i++) {
            await screenshot_custom(this._dt * 20);
        }

        for (let i = 5; i < 12; i++) {
            await screenshot_custom(this._dt * 30);
        }
    }

}