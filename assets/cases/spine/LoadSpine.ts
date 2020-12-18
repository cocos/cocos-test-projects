import { _decorator, Component, Node, loader, sp, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LoadSpine')
export class LoadSpine extends Component {


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
