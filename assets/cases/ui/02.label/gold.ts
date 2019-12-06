import { _decorator, Component, Node, LabelComponent } from "cc";
const { ccclass, property } = _decorator;

@ccclass("gold")
export class gold extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    @property({
        type:LabelComponent
    })
    label = null;
    private test = 0;
    start () {
        // Your initialization goes here.
    }

    onButton () {
        this.test += 1;
        this.label.string = this.test;
        if(this.test > 9){
            this.test = 0;
        }
    }
    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
