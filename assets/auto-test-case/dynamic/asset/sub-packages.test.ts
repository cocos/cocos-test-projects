import { find } from 'cc';
// @ts-ignore
import { runScene, sleep, testCase, testClass, waitForFrames } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('sub-packages')
@testClass('SubPackages')
export class SubPackages {
    _dt = 10;
    _delay = 2

    @testCase
    async startPlay() {
        // await sleep(this._delay);
        await waitForFrames(120);
        await screenshot_custom(this._dt);
    }

    @testCase
    async jumpToSubScene01() {
        try {
            // @ts-ignore
            await find('Canvas')?.getComponent('loadSubPack')?.jumpToSubScene01();
            // await sleep(this._delay);
            await waitForFrames(120);
            // @ts-ignore
            if (find('Canvas').scene.name === 'subPack01') {
                await screenshot_custom(this._dt);
                if (this.isExist('Canvas', 'subScript01')) {
                    // @ts-ignore
                    await find('Canvas')?.getComponent('subScript01')?.backToList();
                    await waitForFrames(120);
                    await screenshot_custom(this._dt);
                } else {
                    console.error('subScript01 can not find,please check you test case!')
                }
            }

        } catch (error) {
            console.error(`【script】className:${SubPackages.name},functionName:${this.jumpToSubScene01.name} load subPack01 scene fail`)
        }
    }

    isExist(parentNode: string, componentName: string) {
        if (find(parentNode)?.getComponent(componentName)) {
            return true;
        }
        return false;
    }


    @testCase
    async jumpToSubScene02() {

        try {
            // @ts-ignore
            await find('Canvas')?.getComponent('loadSubPack')?.jumpToSubScene02();
            await sleep(this._delay);
            // @ts-ignore
            if (find('Canvas').scene.name === 'subPack02') {
                await screenshot_custom(this._dt);
                if (this.isExist('Canvas', 'subScript02')) {
                    // @ts-ignore
                    await find('Canvas')?.getComponent('subScript02')?.backToList();
                    await sleep(this._delay);
                    await screenshot_custom(this._dt);
                } else {
                    console.error('subScript01 can not find,please check you test case!')
                }
            }
        } catch (error) {
            console.error(`【script】className:${SubPackages.name},functionName:${this.jumpToSubScene02.name} load subPack02 scene fail`)
        }

        // // @ts-ignore
        // await find('Canvas')?.getComponent('loadSubPack')?.jumpToSubScene02();
        // await sleep(this._delay);
        // await screenshot_custom(this._dt);
        // // @ts-ignore
        // await find('Canvas')?.getComponent('subScript02')?.backToList();
        // await sleep(this._delay);
        // await screenshot_custom(this._dt);
    }
}
