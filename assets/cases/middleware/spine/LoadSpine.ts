import { _decorator, Component, Node, loader, sp, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LoadSpine')
export class LoadSpine extends Component {


    @property({type:Label})
    tips:Label| null = null;

    isLoadedRes = false;

    start () {
        // Your initialization goes here.

        let alienRes;
        if (sp.SPINE_VERSION === '4.2') {
            alienRes = 'spine/alien/4.2/alien-pro';
        } else {
            alienRes = 'spine/alien/3.8/alien-pro';
        }
        loader.loadRes(alienRes, sp.SkeletonData, (err, spineAsset)=> {
            if(err) {
                this.tips!.string = "Failed to load asset";
                this.isLoadedRes = true; // AutoTest: Consider loading complete even if loading failed
                return;
            }
            let comp = this.getComponent('sp.Skeleton') as sp.Skeleton;
            comp.skeletonData = spineAsset!;
            let ani = comp.setAnimation(0, 'run', true);
            this.tips!.string = 'Load Success';
            this.isLoadedRes = true;
        });
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
