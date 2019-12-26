import { _decorator, Component, Node, LabelComponent, SystemEventType } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("MaskInvertedEvent")
@menu('UI/MaskInvertedEvent')
export class MaskInvertedEvent extends Component {
    @property(LabelComponent)
    label: LabelComponent = null;

    @property
    string = '';

    start () {
        this.node.on(SystemEventType.TOUCH_START, this.callback, this);
    }

    callback(){
        this.label.string = this.string;
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
