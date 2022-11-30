import { _decorator, loader, sp, find } from 'cc';
// @ts-ignore
import { captureOneImage, runScene, sleep, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('LoadSpine')
@testClass('LoadSpine')
export class LoadSpine {
    _dt = 5;

    loadResource(){
        return new Promise((resolve, reject)=>{
            loader.loadRes("spine/alien/alien-pro", sp.SkeletonData, (err, spineAsset)=> {
                let _tips = find('Canvas/Node')!.getComponent('LoadSpine')!.tips;
                if(err) {
                    
                    _tips!.string = "Failed to load asset";
                    reject(err)
                    return;
                }
                let comp =  find('Canvas/Node')!.getComponent('LoadSpine')!.getComponent('sp.Skeleton') as sp.Skeleton;
                comp.skeletonData = spineAsset!;
                let ani = comp.setAnimation(0, 'run', true);
                _tips!.string = 'Load Success';
                resolve("ok")
            });
        });
    }
    @testCase
    async play() {
        await screenshot_custom();
        await this.loadResource();
        for (let i = 0; i < 4; i++) {
            await screenshot_custom(this._dt * 2);
        }
    }
    
    /**
    @testCase
    async start() {
        await screenshot_custom();
        await sleep(0.5)
    }

    @testCase
    async play() {
        for (let i = 0; i < 4; i++) {
            await screenshot_custom(this._dt * 2);
        }
    }
     */
}