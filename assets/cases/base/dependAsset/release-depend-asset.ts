import { _decorator, Component, Node, Prefab, loader } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('releaseDependAsset')
export class releaseDependAsset extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    @property({
        type: Prefab,
    })
    prefabAsset = null;

    @property({
        type: Node,
    })
    prefabNode = null;


    start () {
        // Your initialization goes here.
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }

    relesaeAsset () {
        if(!this.prefabNode.active) {
            return;
        }
        this.prefabNode.active = false;
        let deps = loader.getDependsRecursively(this.prefabAsset);
        loader.release(deps);
    }
}
