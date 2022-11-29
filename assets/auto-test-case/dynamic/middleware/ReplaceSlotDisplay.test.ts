import { find } from 'cc';
// @ts-ignore
import { captureOneImage, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('ReplaceSlotDisplay')
// @testClass('ReplaceSlotDisplay')
export class ReplaceSlotDisplay {
    _dt = 10;

    @testCase
    async start() {
        // 截图
        await screenshot_custom(this._dt);
    }

    @testCase
    async left() {
        if (find('Canvas')) {
            // @ts-ignore
            find('Canvas')!.getComponent('ReplaceSlotDisplay')!.left();
            // 截图
            await screenshot_custom(this._dt);
        } else {
            console.error('【TestCaseScript】 ReplaceSlotDisplay scene is error,can not find Canvas Node')
        }



    }

    @testCase
    async right() {
        try {
            if (find('Canvas')) {
                // @ts-ignore
                find('Canvas')!.getComponent('ReplaceSlotDisplay')!.right();
                // 截图
                await screenshot_custom(this._dt);
            } else {
                console.error('【TestCaseScript】 ReplaceSlotDisplay scene is error,can not find Canvas Node')
            }
        } catch (error) {
            console.error(`【TestCaseScript】 ReplaceSlotDisplay scene is error:${error}`)
        }
    }
}
