// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('2d-rendering-in-3d')
@testClass('T2dRenderingIn3d')
export class T2dRenderingIn3d {
    public _dt = 160;

    @testCase
    async play_01() {
        await screenshot_custom(this._dt);
    }

    @testCase
    async play_02() {
        await screenshot_custom(this._dt + 40);
    }

}


