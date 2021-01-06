import { _decorator, Component, Node, Prefab, instantiate } from "cc";
const { ccclass, property } = _decorator;

export const sceneArray:string[] = [];

@ccclass("scenemanager")
export class SceneManager extends Component {

    @property ({ type: Prefab })
    itemPrefab: Prefab | null  = null;

    onLoad() {
        if(this.itemPrefab){
            for(let i = 0; i<sceneArray.length; i++ ) {
                let item = instantiate(this.itemPrefab);
                this.node.addChild(item);
            }
        }
    }

    onDestroy () {
        let length = sceneArray.length;
        for(let i = 0; i < length; i++) {
            sceneArray.pop();
        }
    }
}
