// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { _decorator, Component, Node, loader, sp, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LoadSpine')
export class LoadSpine extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    @property({type:Label})
    tips:Label| null = null;

    start () {
        // Your initialization goes here.

        loader.loadRes("spine/alien/alien-pro", sp.SkeletonData, (err, spineAsset)=> {
            if(err) {
                this.tips!.string = "Failed to load asset";
                return;
            }
            let comp = this.getComponent('sp.Skeleton') as sp.Skeleton;
            comp.skeletonData = spineAsset!;
            let ani = comp.setAnimation(0, 'run', true);
            this.tips!.string = 'Load Success';
        });
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
