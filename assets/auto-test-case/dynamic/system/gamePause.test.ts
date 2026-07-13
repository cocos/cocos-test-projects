// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';
import { find } from 'cc';

@runScene('gamePause')
@testClass('GamePause')
export class GamePause {
    _dt = 20;

    @testCase
    async startPlay() {
        await screenshot_custom();
    }

    @testCase
    async onResume() {
        this.resume();
        for(let i=0;i<2;i++){
            await screenshot_custom(this._dt +30);
        }
    }

    @testCase
    async onPause() {
        this.pause();
        for(let i=0;i<2;i++){
            await screenshot_custom(this._dt + 80);
        }
    }
    
    async pause() {
        // @ts-ignore
        find('Canvas').getComponent('button').onPause()
    }

    async resume() {
        // @ts-ignore
        find('Canvas').getComponent('button').onResume()
    }
}