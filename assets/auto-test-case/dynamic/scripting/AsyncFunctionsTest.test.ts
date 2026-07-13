import { ScrollView, find } from 'cc';
// @ts-ignore
import { testCase, testClass, beforeClass, expect } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';
import { AsyncFunctionsTest } from '../../../cases/scripting/language-feature/async-functions/AsyncFunctionsTest';

@testClass('AsyncFunctionsTests', 'AsyncFunctionsTest')
export class AsyncFunctionsTests {
    private caseScript!: AsyncFunctionsTest;

    @beforeClass
    initData() {
        this.caseScript = find('Camera')?.getComponent(AsyncFunctionsTest)!;
        this.caseScript.isAutoTest = true;
    }

    @testCase
    async testSleep() {
        const timestamp1 = performance.now();
        await this.caseScript.testSleep();
        const timestamp2 = performance.now();
        await screenshot_custom(2);
        expect(Math.abs(timestamp2 - timestamp1 - 2000)).to.lessThan(200);
    }

    @testCase
    async testSleepThrow() {
        const timestamp1 = performance.now();
        await this.caseScript.testSleepThrow();
        const timestamp2 = performance.now();
        const scrollview = find('Canvas/scroll-view-template')?.getComponent(ScrollView);
        scrollview!.scrollToBottom();
        await screenshot_custom(20);
        expect(Math.abs(timestamp2 - timestamp1 - 1000)).to.lessThan(200);
    }
}