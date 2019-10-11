import { _decorator, Component, Node, ButtonComponent } from "cc";
const { ccclass, property } = _decorator;

const emptyArr = new Array();

@ccclass("ButtonEventCapture")
export class ButtonEventCapture extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    @property({
        type:cc.Component.EventHandler,
    })
    public eventHandler = new cc.Component.EventHandler;

    private _button:ButtonComponent;

    start () {
        // Your initialization goes here.
        this._button = this.getComponent(ButtonComponent);
    }

    update (deltaTime: number) {
        // Your update function goes here.
        if ((this._button as any)._pressed) {
            emptyArr[0] = deltaTime;
            this.eventHandler.emit(emptyArr);
        }
    }
}
