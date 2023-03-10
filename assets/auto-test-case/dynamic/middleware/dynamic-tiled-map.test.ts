import { find, Button } from 'cc';
// @ts-ignore
import { runScene, sleep, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait, waitForFrames } from '../common/utils';

@runScene('dynamic-tiled-map')
@testClass('DynamicTiledMap')
export class DynamicTiledMap {
    _dt = 20;
    _delay = 0.5;

    @testCase
    async startPlay() {
        await screenshot_custom_by_wait(this._dt);
        //find('Canvas/Button')!.getComponent(Button)?.clickEvents[0].emit([]);
        //await sleep(this._delay);
        await find('Canvas')!.getComponent('DynamicTiledMap').onLoadTileMap('tilemap/tile_iso_offset');
        await screenshot_custom_by_wait(this._dt);

        //await sleep(this._delay);
        await find('Canvas')!.getComponent('DynamicTiledMap').onLoadTileMap('tilemap/tile_iso_offset_with_tsx');
        await screenshot_custom_by_wait(this._dt);
    }
    /**
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
     */

}