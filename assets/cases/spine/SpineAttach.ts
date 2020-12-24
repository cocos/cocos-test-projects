


import { _decorator, Component, sp, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SpineAttach')
export default class extends Component {

    @property({ type: sp.Skeleton })
    skeleton: sp.Skeleton | null = null;

    @property({ type: Label })
    modeLabel: Label | null = null;

    changeMode () {
        let isCached = this.skeleton!.isAnimationCached();
        if (isCached) {
            this.skeleton!.setAnimationCacheMode(sp.Skeleton.AnimationCacheMode.REALTIME);
            this.modeLabel!.string = "cache";
        } else {
            this.skeleton!.setAnimationCacheMode(sp.Skeleton.AnimationCacheMode.SHARED_CACHE);
            this.modeLabel!.string = "realtime";
        }
    }
}
