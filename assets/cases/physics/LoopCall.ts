import { _decorator, Component, LabelComponent } from "cc";
const { menu, ccclass, property } = _decorator;

@ccclass("LoopCall")
@menu("physics/LoopCall")
export class LoopCall extends Component {

    start () {
        // Your initialization goes here.
        setInterval(this.clearString.bind(this), 3000);
    }

    /**
     * clearString
     */
    public clearString () {
        const lable = this.getComponent(LabelComponent);
        if (lable) {
            lable.string = '-------------FLUSH------------ ';
        }
    }
}
