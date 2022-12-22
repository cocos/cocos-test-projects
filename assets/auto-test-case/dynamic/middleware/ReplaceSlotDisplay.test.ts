import { find } from 'cc';
// @ts-ignore
import { captureOneImage, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';

@runScene('ReplaceSlotDisplay')
@testClass('ReplaceSlotDisplay')
export class ReplaceSlotDisplay {
    _dt = 20;

    @testCase
    async startPlay(){
        await screenshot_custom_by_wait(this._dt);
        if (find('Canvas')) {
            // @ts-ignore
            find('Canvas')!.getComponent('ReplaceSlotDisplay')!.left();
            await screenshot_custom_by_wait(this._dt);
            // @ts-ignore
            find('Canvas')!.getComponent('ReplaceSlotDisplay')!.right();
            await screenshot_custom_by_wait(this._dt);
            // @ts-ignore
            find('Canvas')!.getComponent('ReplaceSlotDisplay')!.right();
            await screenshot_custom_by_wait(this._dt);
            // @ts-ignore
            find('Canvas')!.getComponent('ReplaceSlotDisplay')!.left();
            await screenshot_custom_by_wait(this._dt);
        } else {
            console.error('【TestCaseScript】 ReplaceSlotDisplay scene is error,can not find Canvas Node')
        }
    }

    /**
    @testCase
    async start() {
        await screenshot_custom(this._dt);
    }

    @testCase
    async left() {
        if (find('Canvas')) {
            // @ts-ignore
            find('Canvas')!.getComponent('ReplaceSlotDisplay')!.left();
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
                await screenshot_custom(this._dt);
            } else {
                console.error('【TestCaseScript】 ReplaceSlotDisplay scene is error,can not find Canvas Node')
            }
        } catch (error) {
            console.error(`【TestCaseScript】 ReplaceSlotDisplay scene is error:${error}`)
        }
    }
     */
}
