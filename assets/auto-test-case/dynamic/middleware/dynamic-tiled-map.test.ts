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
        let num = 200; //用于计数，如果isLoadedRes没有加载好，也不能卡住。最多200帧
        let isLoadedMap = find('Canvas')!.getComponent('DynamicTiledMap').isLoadedMap;
        let isLoadedMapWithTsx = find('Canvas')!.getComponent('DynamicTiledMap').isLoadedMapWithTsx;

        await screenshot_custom_by_wait(this._dt);
        find('Canvas/Button')!.getComponent(Button)?.clickEvents[0].emit([]);
        //await sleep(this._delay);
        while(!isLoadedMap && num>0){
            await waitForFrames();
        }
        num = 200;
        await screenshot_custom_by_wait(this._dt);
        find('Canvas/Button-001')!.getComponent(Button)?.clickEvents[0].emit([]);
        while(!isLoadedMapWithTsx && num>0){
            await waitForFrames();
        }
        //await sleep(this._delay);
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