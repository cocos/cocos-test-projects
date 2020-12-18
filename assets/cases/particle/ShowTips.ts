import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("ShowTips")
export class ShowTips extends Component {

    private tips: Node | null = null;
    private ifShow = true;

    showTip () {
        if (this.ifShow == false) {
            this.tips!.setPosition(0, 1000, 0);
        }

        if (this.ifShow) {
            this.tips!.setPosition(0, 0, 0);
        }

        this.ifShow = !this.ifShow;
    }

    start () {
        // Your initialization goes here.
        this.tips = this.node.getChildByName('tips');
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
