import { find } from 'cc';
// @ts-ignore
import { testCase, testClass, beforeClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';
import { ByteCodeCache } from '../../../cases/scripting/bytecode/ByteCodeLoader';

@testClass('ByteCode', 'bytecode')
export class ByteCode {
    private caseScript!: ByteCodeCache;
    private df = 2;

    @beforeClass
    initData() {
        this.caseScript = find('Canvas/Sprite')?.getComponent(ByteCodeCache)!;
        this.caseScript.unscheduleAllCallbacks();
    }

    @testCase
    async startPlay() {
        await screenshot_custom(this.df);

        this.caseScript.runTest();
        await screenshot_custom(this.df);
    }
}