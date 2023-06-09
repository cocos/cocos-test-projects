// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';

@testClass('SpineCollider', 'SpineCollider')
export class SpineCollider {

    @testCase
    async startPlay() {
        await screenshot_custom_by_wait(40);
        await screenshot_custom_by_wait(10);
        await screenshot_custom_by_wait(10);
        await screenshot_custom_by_wait(10);
        await screenshot_custom_by_wait(15);
    }
}