import { find } from 'cc';
// @ts-ignore
import { captureOneImage, runScene, sleep, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('LoadResDir')
// @testClass('LoadResDir')
export class LoadResDir {
    _dt = 15;
    _delay = 2
    @testCase
    async startPlay() {
        await screenshot_custom(this._dt);
    }

    @testCase
    async onLoadAll() {
        // @ts-ignore
        find('Canvas').getComponent('LoadResDirExample').onLoadAll();
        await sleep(this._delay);
        await screenshot_custom(this._dt);
        // @ts-ignore
        find('Canvas/ScrollView').getComponent('cc.ScrollView').content.position = { x: -260, y: 700, z: 0 }
        await screenshot_custom(this._dt);
        // @ts-ignore
        find('Canvas/ScrollView').getComponent('cc.ScrollView').content.position = { x: -260, y: 1170, z: 0 }
        await screenshot_custom(this._dt);
        // @ts-ignore
        find('Canvas/ScrollView').getComponent('cc.ScrollView').content.position = { x: -260, y: 2093.7499000000003, z: 0 }
        await screenshot_custom(this._dt);
        // @ts-ignore
        find('Canvas/ScrollView').getComponent('cc.ScrollView').content.position = { x: -260, y: 2531.2499000000003, z: 0 }
        await screenshot_custom(this._dt);
        // @ts-ignore
        find('Canvas/ScrollView').getComponent('cc.ScrollView').content.position = { x: -260, y: 3031.2499000000003, z: 0 }
        await screenshot_custom(this._dt);
        // @ts-ignore
        find('Canvas/ScrollView').getComponent('cc.ScrollView').content.position = { x: -260, y: 3139.4, z: 0 }
        await screenshot_custom(this._dt);
    }

    @testCase
    async onLoadSpriteFrameAll() {
        // @ts-ignore
        find('Canvas').getComponent('LoadResDirExample').onLoadSpriteFrameAll();
        await screenshot_custom(this._dt);
    }

    @testCase
    async onClearAll() {
        // @ts-ignore
        find('Canvas').getComponent('LoadResDirExample').onClearAll();
        await screenshot_custom(this._dt);
    }

}