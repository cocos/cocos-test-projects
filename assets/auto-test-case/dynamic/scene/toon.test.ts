// @ts-ignore
// @ts-ignore
import { beforeClass, testCase, testClass, srandom } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';
import { director } from 'cc';

@testClass('Toon', 'toon')
export class Toon {
    private df =  60;

    @beforeClass
    async initData() {
        srandom(director.getScene()!.name);
    }

    @testCase
    async start() {
        await screenshot_custom();
        for (let i=0; i<3; i++) {
            await screenshot_custom(this.df);
        }
    }
}
