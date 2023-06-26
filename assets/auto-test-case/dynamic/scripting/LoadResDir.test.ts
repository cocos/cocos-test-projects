import { find } from 'cc';
// @ts-ignore
import { testCase, testClass, beforeClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';
import { LoadResDirExample } from '../../../cases/scripting/asset_loading/LoadResDir/LoadResDir_example';

@testClass('LoadResDir', 'LoadResDir')
export class LoadResDir {
    private caseScript!: LoadResDirExample;
    private df = 2;

    @beforeClass
    initData() {
        this.caseScript = find('Canvas')?.getComponent(LoadResDirExample)!;
    }
    
    @testCase
    async startPlay() {
        await screenshot_custom(this.df);
    }

    @testCase
    async onLoadAll() {
        await this.caseScript.onLoadAll();
        await screenshot_custom(this.df);

        this.caseScript.scrollView.scrollToBottom();
        await screenshot_custom(this.df);
    }

    @testCase
    async onLoadSpriteFrameAll() {
        this.caseScript.onClearAll();

        await this.caseScript.onLoadSpriteFrameAll();
        await screenshot_custom(this.df);
    }

    @testCase
    async onClearAll() {
        this.caseScript.onClearAll();
        await screenshot_custom(this.df);
    }
}