// @ts-ignore
import { runScene, testCase, testClass, sleep } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';

@testClass('SurfaceShader', 'surface-shader')
export class SurfaceShader {

    @testCase
    async start(){
        await screenshot_custom_by_wait(600);
    }
}