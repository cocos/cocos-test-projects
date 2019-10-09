import { _decorator, Component, Node, LabelComponent, ScrollViewComponent, math, Vec3 } from "cc";
import { sceneArray } from "./scenelist";
import { backbutton } from "./backbutton";
const { ccclass, property } = _decorator;

@ccclass("ListItem")
export class ListItem extends Component {

    index = -1;
    _name = "";
    label : LabelComponent | null = null;

    _ScrollCom : ScrollViewComponent;


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
        this._ScrollCom = this.node.getParent().getParent().getParent().getComponent(ScrollViewComponent) as ScrollViewComponent;
    }

    public loadScene() {
        backbutton.offset = new Vec3(0, this._ScrollCom.getScrollOffset().y, 0);
        cc.director.loadScene(this._name);
    }

    public updateItem(idx: number, name: string) {
        this.index = idx;
        this._name = name;
        this.label.string = name;
    }
}
