import { _decorator, Component, Node, instantiate, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('mask_migrate')
export class mask_migrate extends Component {
    @property({
        type: Prefab
    })
    maskPerfab : Prefab = null!;

    start() {
        const maskNode = instantiate(this.maskPerfab);
        maskNode.setParent(this.node);
        maskNode.setPosition(200, 0, 0);
    }
}

