import { director } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('PartAnimation')
@testClass('PartAnimation')
export class PartAnimation {
    _dt = 2;

    @testCase
    async white() {
        await screenshot_custom();
    }

    @testCase
    async yellow(){
        await screenshot_custom(7939);
    }
}