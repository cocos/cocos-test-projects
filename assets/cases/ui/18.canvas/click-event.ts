import { _decorator, Component, Node, Label } from "cc";
const { ccclass, property } = _decorator;

@ccclass("ClickEvent")
export class ClickEvent extends Component {

    @property({type: Label})
    public notice: Label = null!;

    start () {
        // Your initialization goes here.
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }

    onButtonClick() {
        if (this.notice) {
            this.notice.string = this.node.name + ' had click!'
        }
    }
}
