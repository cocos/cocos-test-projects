import { _decorator, Component, sp, Node, Prefab, instantiate, resources } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SpineTestCrash')
export class SpineTestCrash extends Component {

    @property({ type: sp.Skeleton })
    firstSpine!: sp.Skeleton;

    @property({ type: sp.Skeleton })
    secondSpine!: sp.Skeleton;

    @property({ type: sp.Skeleton })
    thirdSpine!: sp.Skeleton;

    @property({
        type: Prefab
    })
    spineBoyPrefab: Prefab = null!;

    @property({
        type: Prefab
    })
    spineBoyPrefab_4_2: Prefab = null!;

    private _alienSkeletonData : sp.SkeletonData | null = null;

    start() {
        const prefab = sp.SPINE_VERSION === '3.8' ? this.spineBoyPrefab : this.spineBoyPrefab_4_2;
        this.firstSpine.setCompleteListener((trackEntry) => {
            // Create two nodes with Spine animations via Prefab, and set up/play the animations through code.
            for (let i = 0; i < 2; i++) {
                const node = instantiate(prefab);
                node.setPosition(-200 + i * 150, 0)
                node.name = 'spineBoy' + i;
                this.node.addChild(node);
                const spine = node.getComponent(sp.Skeleton);
                // play animation
                spine!.setAnimation(0, 'walk', false);
            }

            // Call destroy() on the last node after a delay of 1.5 seconds.
            // This is to test the crash issue when destroying a node with a Spine animation.
            this.scheduleOnce(() => {
                const length = this.node.children.length;
                const node = this.node.children[length - 1];
                node.parent = null;
                node.destroy();
            }, 1.5)
        });

        if (sp.SPINE_VERSION === '3.8') {
            resources.load('spine/alien/3.8/alien-pro', sp.SkeletonData, (err, asset) => {
                this._alienSkeletonData = asset;
            });
        } else {
            resources.load('spine/alien/4.2/alien-pro', sp.SkeletonData, (err, asset) => {
                this._alienSkeletonData = asset;
            });
        }

        
        this.secondSpine.setCompleteListener((trackEntry) => {
            this.secondSpine.skeletonData = null;
            this.secondSpine.skeletonData = this._alienSkeletonData;
            this.secondSpine.setAnimation(0, 'run', true);
        });
    }

    update(deltaTime: number) {
        
    }
}

