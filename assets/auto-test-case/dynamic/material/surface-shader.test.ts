import { find } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('surface-shader')
@testClass('SurfaceShader')
export class SurfaceShader {
    _dt = 10;

    @testCase
    async start(){
        await screenshot_custom(this._dt);
    }
}