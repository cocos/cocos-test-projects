// @ts-ignore
import { testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../dynamic/common/utils'

@testClass('BuiltinTextures', 'builtin-textures')
export class BuiltinTextures {
    @testCase
    async startPlay() {
        await screenshot_custom(5);
    }
}