import { find, dragonBones, loader } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass, sleep } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';

@runScene('DragonMesh')
@testClass('DragonMesh')
export class DragonMesh {
    _dt = 21;
    _delay = 0.5;
    @testCase
    async startLoad() {
        // await screenshot_custom(this._dt);
        for (let i = 0; i < 3; i++) {
            await screenshot_custom_by_wait(this._dt);
        }
    };

    loadResource(){
        return new Promise((resolve, reject)=>{
            loader.loadRes('dragonBones/NewDragonTest', dragonBones.DragonBonesAsset, (err, res)=> {
                if(err) {
                    console.error(err);
                    reject(err);
                    return
                }
                let _dragonBones = find('Canvas')!.getComponent('LoadDragonBones')!.dragonBones;
                _dragonBones.dragonAsset = res!;
                loader.loadRes('dragonBones/texture', dragonBones.DragonBonesAtlasAsset, async (err, res)=>{
                    if(err) {
                        console.error(err);
                        return;
                    }
                    _dragonBones.dragonAtlasAsset = res!;
                    _dragonBones.armatureName = "armatureName";
                    _dragonBones.playAnimation('stand', 0);
                    
                    
                    resolve("ok");
                });
            });
        })
    }

    @testCase
    async dynamicCreate() {
        try {
            //await sleep(this._delay);
            // @ts-ignore
            //find('Canvas').getComponent('LoadDragonBones').dynamicCreate();
            // director.tick(1);
            // director.pause();
            // 截图 or 断言
            // await screenshot_custom(this._dt);
            await this.loadResource();
            for (let i = 0; i < 3; i++) {
                await screenshot_custom_by_wait(this._dt);
            }
            
            
            //console.log(`【script】className:${DragonMesh.name} functionName:${this.dynamicCreate.name}`)
        } catch (error) {
            console.error(`【script】className:${DragonMesh.name} functionName:${this.dynamicCreate.name} has error ${error}`)
        }
    }
}



