// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { _decorator, Component, Node, loader, dragonBones } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LoadDragonBones')
export class LoadDragonBones extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    @property({type: dragonBones.ArmatureDisplay})
    dragonBones: dragonBones.ArmatureDisplay | null = null

    start () {
        // Your initialization goes here.
    }

    dynamicCreate() {
        const self = this;
        loader.loadRes('dragonBones/NewDragonTest', dragonBones.DragonBonesAsset, (err, res)=> {
            if(err) {
                console.error(err);
                return;
            }
            this.dragonBones!.dragonAsset = res!;
            loader.loadRes('dragonBones/texture', dragonBones.DragonBonesAtlasAsset, (err, res)=>{
                if(err) {
                    console.error(err);
                    return;
                }
                this.dragonBones!.dragonAtlasAsset = res!;
                this.dragonBones!.armatureName = "armatureName";
                this.dragonBones!.playAnimation('stand', 0);
            });
        });
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
