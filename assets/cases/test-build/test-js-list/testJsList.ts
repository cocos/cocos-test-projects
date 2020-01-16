import { _decorator, Component, Node, LabelComponent } from "cc";
const { ccclass, property } = _decorator;

@ccclass("testJsList")
export class testJsList extends Component {

    @property({type: LabelComponent})
    label = null;

    start () {
        if (window.JS_LIST_TIPS) {
            this.label.string = window.JS_LIST_TIPS;
        }
    }
}
