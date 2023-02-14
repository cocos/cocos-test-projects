import { _decorator, Component, Node, Label, director } from "cc";
import { SceneManager } from "./scenelist";
import { SceneList } from "./common";
import { BackButton } from "./backbutton";
const { ccclass, property } = _decorator;

@ccclass("FoldItem")
export class FoldItem extends Component {

    index = -1;
    _name = "";
    label : Label | null = null;

    onload () {

    }

    start () {
        // Your initialization goes here.
        this.index = this.node.getSiblingIndex() - SceneList.foldCount;
        this._name = "";
        if(this.node){
            this.label = this.node.getComponentInChildren(Label) as Label;
        }
        this.updateItem(this.index,SceneList.sceneFold[this.index]);
        SceneList.foldCount++;
    }

    public loadScene() {
        return new Promise<void>((resovle, reject) => {
            BackButton.saveOffset();
            BackButton.saveIndex(this.index);
            director.loadScene(this._name, (error: any) => {
                error ? reject(error) : resovle();
            });
        });
    }

    public updateItem(idx: number, name: string) {
        this.index = idx;
        this._name = name;
        if (this.label) {
            this.label.string = name;
        }
    }
}
