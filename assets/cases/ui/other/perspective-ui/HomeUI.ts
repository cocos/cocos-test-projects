import { _decorator, Component, Node, Animation, Enum } from "cc";
const { ccclass, property } = _decorator;
import { BackPackUI } from "./BackPackUI";

@ccclass
export class HomeUI extends Component {
    @property(BackPackUI)
    backPackUI: BackPackUI = null!;


    // use this for initialization
    onLoad() {
        // this.menuAnim.play('menu_reset');
    }

    start() {
        this.backPackUI.init(this);
    }

    gotoShop() {
    }
}


