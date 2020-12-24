import { _decorator, Component, Label, Button } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("ClickAndListener")
@menu('UI/ClickAndListener')
export class ClickAndListener extends Component {

    _label: Label | null = null;

    start () {
        this._label = this.getComponent(Label);
    }

    clickCallback (event: Button, data: any) {
        this._label!.string = data;
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
