import { _decorator, Component, LabelComponent } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("ClickAndListener")
@menu('UI/ClickAndListener')
export class ClickAndListener extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    _label: LabelComponent | null = null;

    start () {
        this._label = this.getComponent(LabelComponent);
    }

    clickCallback(event, data){
        this._label.string = data;
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
