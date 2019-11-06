import { _decorator, Component, Node, LabelComponent } from "cc";
const { ccclass, property } = _decorator;

@ccclass("clickevent")
export class clickevent extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    @property({type: LabelComponent})
    notice: LabelComponent = null;

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
