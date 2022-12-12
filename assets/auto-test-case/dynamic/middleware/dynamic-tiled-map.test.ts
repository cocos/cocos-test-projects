import { find, Button } from 'cc';
// @ts-ignore
import { captureOneImage, runScene, sleep, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('dynamic-tiled-map')
@testClass('DynamicTiledMap')
export class DynamicTiledMap {
    _dt = 2;
    _delay = 0.5;

    @testCase
    async startPlay() {
        await screenshot_custom();
        find('Canvas/Button')!.getComponent(Button)?.clickEvents[0].emit([]);
        await sleep(this._delay);
        await screenshot_custom();
        find('Canvas/Button-001')!.getComponent(Button)?.clickEvents[0].emit([]);
        await sleep(this._delay);
        await screenshot_custom();
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