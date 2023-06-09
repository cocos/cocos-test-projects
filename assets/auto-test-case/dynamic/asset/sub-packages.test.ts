import { find, Component } from 'cc';
// @ts-ignore
import { runScene, sleep, testCase, testClass, waitForFrames } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('sub-packages')
@testClass('SubPackages')
export class SubPackages {
    _dt = 70;

    @testCase
    async startPlay() {
        await waitForFrames(120);
        await screenshot_custom(this._dt);
    }

    @testCase
    async jumpToSubScene01() {
        try {
            const jumpToSubScene01: Component | undefined | null = find('Canvas')?.getComponent('loadSubPack');
            // @ts-ignore
            await jumpToSubScene01!.jumpToSubScene01();
            await waitForFrames(this._dt + 60);
            // @ts-ignore
            if (find('Canvas').scene.name === 'subPack01') {
                await screenshot_custom(this._dt);
                if (this.isExist('Canvas', 'subScript01')) {
                    // @ts-ignore
                    let subScript01 = find('Canvas')?.getComponent('subScript01');
                    // @ts-ignore
                    await subScript01!.backToList();
                    await screenshot_custom(this._dt + 60);
                } else {
                    console.error('subScript01 can not find,please check you test case!');
                }
            }

        } catch (error) {
            console.error(`【script】className:${SubPackages.name},functionName:${this.jumpToSubScene01.name} load subPack01 scene fail`);
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
            const jumpToSubScene02: Component | undefined | null = find('Canvas')?.getComponent('loadSubPack');
            // @ts-ignore
            await jumpToSubScene02!.jumpToSubScene02();
            await waitForFrames(this._dt + 60);
            // @ts-ignore
            if (find('Canvas').scene.name === 'subPack02') {
                await screenshot_custom(this._dt);
                if (this.isExist('Canvas', 'subScript02')) {
                    // @ts-ignore
                    let subScript02 = find('Canvas')?.getComponent('subScript02');
                    // @ts-ignore
                    await subScript02!.backToList();
                    await screenshot_custom(this._dt + 120);
                } else {
                    console.error('subScript02 can not find,please check you test case!');
                }
            } else {
                console.error('subPack02 can not find,please check you test case!');
            }
        } catch (error) {
            console.error(`【script】className:${SubPackages.name},functionName:${this.jumpToSubScene02.name} load subPack02 scene fail`);
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
