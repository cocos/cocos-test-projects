import { _decorator, Component, Node, Label } from "cc";
const { ccclass, property } = _decorator;

@ccclass("gold")
export class gold extends Component {


    @property({
        type: Label
    })
    public label: Label = null!;
    private test = 0;
    start () {
        // Your initialization goes here.
    }

    onButton () {
        this.test += 1;
        this.label.string = `${this.test}`;
        if(this.test > 9){
            this.test = 0;
        }
    }
    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
