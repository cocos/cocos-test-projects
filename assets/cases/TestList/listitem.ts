import { _decorator, Component, Node, LabelComponent } from "cc";
import { sceneArray } from "./scenelist";
const { ccclass, property } = _decorator;

@ccclass("ListItem")
export class ListItem extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    index = -1;
    _name = "";
    label : LabelComponent | null = null;

    onload () {

    }

    start () {
        // Your initialization goes here.
        this.index = this.node.getSiblingIndex();
        this._name = "";
        if(this.node){
            this.label = this.node.getComponentInChildren(LabelComponent) as LabelComponent;
        }
        this.updateItem(this.index,sceneArray[this.index]);
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }

    public loadScene() {
        cc.director.loadScene(this._name);
    }

    public updateItem(idx: number, name: string) {
        this.index = idx;
        this.name = name;
        this.label.string = name;
    }
}
