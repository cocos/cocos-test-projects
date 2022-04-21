import { _decorator, Component, Node, Prefab, loader } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('releaseDependAsset')
export class releaseDependAsset extends Component {

    @property({
        type: Prefab,
    })
    prefabAsset: Prefab = null!;

    @property({
        type: Node,
    })
    prefabNode: Node = null!;

    releaseAsset () {
        if(!this.prefabNode){
            return;
        }

        if(!this.prefabNode.active) {
            return;
        }

        this.prefabNode.active = false;
        this.prefabNode.parent = null;
        let deps = loader.getDependsRecursively(this.prefabAsset);
        loader.release(deps);
    }
}
