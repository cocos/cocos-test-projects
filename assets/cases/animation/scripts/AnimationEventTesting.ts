import { _decorator, Component, Label } from "cc";
const { ccclass, property } = _decorator;

@ccclass("AnimationEventTesting")
export class AnimationEventTesting extends Component {

    @property({ type: Label })
    public label: Label = null!;

    private _times = 1;

    start () {
        // Your initialization goes here.
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }

    AnimationEventTest (param: string) {
        this.label.string = "第" + this._times++ + "次，" + param;
    }
}
