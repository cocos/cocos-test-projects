import { _decorator, Component, Button, EventHandler } from "cc";
const { ccclass, property } = _decorator;

const emptyArr = new Array();

@ccclass("ButtonEventCapture")
export class ButtonEventCapture extends Component {

    @property({
        type: EventHandler,
    })
    public eventHandler = new EventHandler();

    private _button: Button = null!;
    private _click = false;

    start () {
        // Your initialization goes here.
        this._button = this.getComponent(Button)!;
        this._button.node.on(Button.EventType.CLICK, this.click, this);
    }

    click () {
        this._click = true;
    }

    update (deltaTime: number) {
        // Your update function goes here.
        if (this._click) {
            emptyArr[0] = deltaTime;
            this.eventHandler.emit(emptyArr);
            this._click = false;
        }
    }
}
