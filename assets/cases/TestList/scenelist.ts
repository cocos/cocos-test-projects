import { _decorator, Component, Node, Prefab, instantiate } from "cc";
const { ccclass, property } = _decorator;

export const sceneArray:string[] = [];

@ccclass("scenemanager")
export class SceneManager extends Component {

    @property ({ type: Prefab })
    itemPrefab: Prefab | null  = null;

    onLoad() {
        // 场景排序
        sceneArray.sort((a, b) => a.toLowerCase() > b.toLowerCase() ? 1 : -1);
        if(this.itemPrefab){
            for(let i = 0; i<sceneArray.length; i++ ) {
                let item = instantiate(this.itemPrefab);
                this.node.addChild(item);
            }
        }
    }
}
