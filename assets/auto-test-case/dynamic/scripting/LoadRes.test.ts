import { find } from 'cc';
// @ts-ignore
import { runScene, sleep, testCase, testClass, beforCase } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('LoadRes')
@testClass('LoadRes')
export class LoadRes {
    _dt: number = 5;
    content: boolean = false

    // @beforCase
    // init() {
    //     // @ts-ignore
    //     if (find('Canvas').getComponent('LoadResExample')?.node.getChildByName("content")) {
    //         this.content = true;
    //     }
    // }

    @testCase
    async startPlay() {
        await screenshot_custom(this._dt);
    }

    @testCase
    async loadSpriteFrame() {
        // @ts-ignore
        find('Canvas').getComponent('LoadResExample').loadSpriteFrame();
        await sleep(3)
        await screenshot_custom(this._dt);
    }


    @testCase
    async loadPrefab() {
        // let conentString = ''
        // @ts-ignore
        find('Canvas').getComponent('LoadResExample').loadPrefab();
        await sleep(3)
        await screenshot_custom(this._dt);
        // @ts-ignore
        // conentString = find('Canvas').getComponent('LoadResExample')?.node.getChildByName("content").getChildByName("prefab").getComponent('cc.Label').string
        // if (conentString === 'This is a prefab') {
        //     await screenshot_custom(this._dt);
        // } else {
        //     await sleep(5);
        //     // @ts-ignore
        //     find('Canvas').getComponent('LoadResExample').loadPrefab();
        //     if (conentString === 'This is a prefab') {

        //     }
        // }
    }
}