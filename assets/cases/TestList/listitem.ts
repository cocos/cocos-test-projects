import { _decorator, Component, Node, Label, director } from "cc";
import { sceneArray } from "./scenelist";
import { BackButton } from "./backbutton";
const { ccclass, property } = _decorator;

@ccclass("ListItem")
export class ListItem extends Component {

    index = -1;
    _name = "";
    label : Label | null = null;

    onload () {

    }

    start () {
        // Your initialization goes here.
        this.index = this.node.getSiblingIndex();
        this._name = "";
        if(this.node){
            this.label = this.node.getComponentInChildren(Label) as Label;
        }
        this.updateItem(this.index,sceneArray[this.index]);
    }

    public loadScene() {
        BackButton.saveOffset();
        BackButton.saveIndex(this.index);
        director.loadScene(this._name);
    }

    public updateItem(idx: number, name: string) {
        this.index = idx;
        this._name = name;
        this.label.string = name;
    }
}
