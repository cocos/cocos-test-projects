import { _decorator, Component, sp, Node, Prefab, instantiate } from 'cc';
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

    start() {
        const prefab = sp.SPINE_VERSION === '3.8' ? this.spineBoyPrefab : this.spineBoyPrefab_4_2;
        this.firstSpine.setCompleteListener((trackEntry) => {
            const node = instantiate(prefab);
            this.node.addChild(node);
        });
    }

    update(deltaTime: number) {
        
    }
}

