import { _decorator, CCString, Component, sp } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SpineVersionBind')
export class SpineVersionBind extends Component {

    @property({ type: sp.SkeletonData })
    skeletonData_3_8!: sp.SkeletonData;

    @property({ type: sp.SkeletonData })
    skeletonData_4_2!: sp.SkeletonData;

    @property({ type: sp.Skeleton })
    skeleton!: sp.Skeleton;

    @property({ type: CCString })
    skinName!: string;

    @property({ type: CCString })
    animationName!: string;


    onLoad() {
        const version = sp.SPINE_VERSION;
        if (version === undefined || version === '3.8') {
            this.skeleton.skeletonData = this.skeletonData_3_8;
        } else if (version === '4.2') {
            this.skeleton.skeletonData = this.skeletonData_4_2;
        }
        if (this.skinName !== '' && this.skinName !== undefined) {
            this.skeleton.setSkin(this.skinName);
        }
        if (this.animationName !== '' && this.skinName !== undefined) {
            this.skeleton.animation = this.animationName;
        }
    }
}

