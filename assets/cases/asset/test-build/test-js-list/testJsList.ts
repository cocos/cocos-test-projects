import { _decorator, Component, Node, Label } from "cc";
const { ccclass, property } = _decorator;

declare global {
    namespace globalThis {
        var JS_LIST_TIPS: string;
    }
}
@ccclass("TestJsList")
export class TestJsList extends Component {

    @property({type: Label})
    public label: Label = null!;

    start () {
        const str: string = globalThis['JS_LIST_TIPS'];
        if (str.length) {
            this.label.string = str;
        }
    }
}
