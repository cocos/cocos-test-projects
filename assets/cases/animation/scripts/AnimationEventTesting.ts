import { _decorator, Component, LabelComponent } from "cc";
const { ccclass, property } = _decorator;

@ccclass("AnimationEventTesting")
export class AnimationEventTesting extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    @property({ type: LabelComponent })
    public label: LabelComponent = null;

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
