import { _decorator, Component, Node, sp } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SpinePhysics')
export class SpinePhysics extends Component {

    @property({ type: sp.SkeletonData })
    skeletonData: sp.SkeletonData;

    @property({ type: sp.Skeleton })
    skeleton: sp.Skeleton;


    start() {

    }

    protected onLoad(): void {
        if (sp.SPINE_VERSION === '4.2') {
            this.node.parent.getChildByName("Unsupported_Tip").active = false;
            this.skeleton.skeletonData = this.skeletonData;
            this.skeleton.setAnimation(0, 'swing', true);
        }
    }
}

