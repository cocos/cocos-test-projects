import { find,sys } from 'cc';
// @ts-ignore
import { testClass, testCase } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';
import { Restart } from '../../../cases/system/restart';
@testClass('RestartTest', 'restart')
export class RestartTest {
    private df = 3;

    @testCase
    async startPlay() {
        for (let i = 0; i < 5; i++) {
            await screenshot_custom(this.df);
        }
    }

    @testCase
    async restart() {
        find('Canvas')!.getComponent(Restart)!.restart();
        // if (sys.platform === sys.Platform.ANDROID || sys.platform === sys.Platform.IOS)
        for (let i = 0; i < 5; i++) {
            await screenshot_custom(this.df);
        }
    }
}