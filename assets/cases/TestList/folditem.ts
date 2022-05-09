import { _decorator, Component, Node, Label, director } from "cc";
import { SceneList, SceneManager } from "./scenelist";
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
        BackButton.saveOffset();
        BackButton.saveIndex(this.index);
        director.loadScene(this._name);
    }

    public updateItem(idx: number, name: string) {
        this.index = idx;
        this._name = name;
        if (this.label) {
            this.label.string = name;
        }
    }
}
