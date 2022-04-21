import { _decorator, Component, Node, Prefab, instantiate } from "cc";
const { ccclass, property } = _decorator;

export class SceneList {

    static sceneArray : string[] = [];
    static sceneFold : string[] = [];
    static foldCount : number = 0;

}

@ccclass("scenemanager")
export class SceneManager extends Component {

    @property ({ type: Prefab })
    itemPrefab: Prefab | null  = null;
    @property ({type: Prefab})
    foldPrefab: Prefab | null = null;

    onLoad() {
        SceneList.foldCount = 0;
        if(this.itemPrefab && this.foldPrefab){     
            // instantiate first item
            let itemFold = instantiate(this.foldPrefab);
            this.node.addChild(itemFold);
            let isChange = false;              
            for(let i = 0; i< SceneList.sceneArray.length; i++ ) {   
                let item = instantiate(this.itemPrefab);
                this.node.addChild(item);         
                // 判断是否需要添加模块名
                if(i + 1 < SceneList.sceneFold.length && SceneList.sceneFold[i] !== SceneList.sceneFold[i + 1]) {
                    isChange = true;
                }
                if (isChange) { // 加模块名
                    let itemFold = instantiate(this.foldPrefab);
                    this.node.addChild(itemFold);
                    isChange = false;
                }             
            }
        }
    }
}
