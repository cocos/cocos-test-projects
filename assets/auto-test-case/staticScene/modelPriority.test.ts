// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../dynamic/common/utils';

@runScene('modelPriority')
@testClass('ModelPriority')
export class ModelPriority {
    _dt = 5;

    @testCase
    async start(){
        await screenshot_custom(this._dt)
    }
}