// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('label-cacheMode-color')
@testClass('LabelCacheModeColor')
export class LabelCacheModeColor {

    @testCase
    async startPlay() {
        await screenshot_custom();
    }
}