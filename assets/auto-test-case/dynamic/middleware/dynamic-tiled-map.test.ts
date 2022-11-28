import { find } from 'cc';
// @ts-ignore
import { captureOneImage, runScene, sleep, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('dynamic-tiled-map')
// @testClass('DynamicTiledMap')
export class DynamicTiledMap {
    _dt = 2;
    _delay = 0.5;

    @testCase
    async onBtnCreateTileMap() {
        // @ts-ignore
        find('Canvas').getComponent('DynamicTiledMap').onBtnCreateTileMap();
        await sleep(this._delay);
        await screenshot_custom(this._dt);
    }

    @testCase
    async onBtnCreateTileMapWithTsx() {
        // @ts-ignore
        find('Canvas').getComponent('DynamicTiledMap').onBtnCreateTileMapWithTsx();
        await sleep(this._delay);
        await screenshot_custom(this._dt);
    }

}