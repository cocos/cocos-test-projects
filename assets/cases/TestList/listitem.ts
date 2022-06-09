import { _decorator, Component, Node, Label, director, Button, Sprite, Color } from "cc";
import { SceneList } from "./scenelist";
import { BackButton } from "./backbutton";
const { ccclass, property } = _decorator;

export enum ItemType {
    SCENSE = 0,
    FOLD = 1,
}


@ccclass("ListItem")
export class ListItem extends Component {
    _name = "";
    index = -1;
    label: Label | null = null;
    color: Color | null = null;
    type: ItemType = ItemType.FOLD;
    xpos: number = -1;
    onload() {
    }

    start() {
        // Your initialization goes here.
        if (this.node) {
            this.label = this.node.getComponentInChildren(Label) as Label;
            this.label.string = this._name;
            if (this.color)
                this.label.color = this.color;
            this.resetPostion(this.label);
        }
    }

    private resetPostion(label: Label) {
        if (!label) {
            return;
        }
        let position = label.node.getPosition();
        if (this.xpos == -1) {
            this.xpos = position.x;
        }

        if (this.type == ItemType.FOLD && this.xpos == position.x) {
            label.node.setPosition(position.x - 20, position.y, position.z);
        } else if (this.type == ItemType.SCENSE && this.xpos != position.x) {
            label.node.setPosition(this.xpos, position.y, position.z);
        }
    }

    public loadScene() {
        BackButton.saveOffset();
        BackButton.saveIndex(this.index);
        director.loadScene(this._name);
    }

    public updateItem(type: ItemType, idx: number) {
        this.index = idx;
        this.type = type;

        let sprite = this.node.getComponent(Sprite);
        let button = this.node.getComponent(Button);

        if (type == ItemType.SCENSE) {
            button!.enabled = true;
            sprite!.enabled = true;
            this._name = SceneList.sceneArray[idx];
            this.color = new Color(0, 0, 0, 255);
        } else {
            button!.enabled = false;
            sprite!.enabled = false;
            this._name = SceneList.sceneFold[idx];
            this.color = new Color(255, 255, 255, 255);
        }
        if (this.label) {
            this.label.color = this.color;
            this.label.string = this._name;

            this.resetPostion(this.label);
        }
    }
}
