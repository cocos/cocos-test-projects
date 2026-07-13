import { _decorator, loader, sp, find } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass, waitForFrames } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';

@runScene('LoadSpine')
@testClass('LoadSpine')
export class LoadSpine {
    _dt = 5;

    @testCase
    async play() {
        let num = 1000; //Used for counting frames, up to 1000 frames
        let isLoadedRes = find('Canvas/Node')!.getComponent('LoadSpine').isLoadedRes;
        while(!isLoadedRes && num>0){
            num -= 1;
            isLoadedRes = find('Canvas/Node')!.getComponent('LoadSpine').isLoadedRe
            await waitForFrames(1); 
        }
        
        await screenshot_custom_by_wait(this._dt * 2);
        //await this.loadResource();
        for (let i = 0; i < 3; i++) {
            await screenshot_custom_by_wait(this._dt * 2);
        }
    }
}