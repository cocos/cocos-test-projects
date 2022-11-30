import { find } from 'cc';
// @ts-ignore
import { captureOneImage, runScene, sleep, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('tile')
@testClass('Tile')
export class Tile {
    _delay = 0.2;
    _dt = 30

    @testCase
    async startPlay() {
        await sleep(this._delay);
        for (let i = 0; i < 3; i++) {
            // @ts-ignore
            find('Canvas/tile').getComponent('Tiled').update(1);
            await screenshot_custom(this._dt);
        };
    }
}