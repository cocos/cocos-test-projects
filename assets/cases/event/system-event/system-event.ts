import { _decorator, Component, systemEvent, SystemEventType, Label, EventTouch, EventKeyboard, Touch } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("SystemEvent")
@menu('Event/SystemEvent')
export class SystemEvent extends Component {

    @property(Label)
    public labelShow: Label = null!;

    start () {
        systemEvent.on(SystemEventType.TOUCH_START, this.onTouchStart, this);
        systemEvent.on(SystemEventType.TOUCH_END, this.onTouchEnd, this);
        systemEvent.on(SystemEventType.TOUCH_MOVE, this.onTouchMove, this);
        systemEvent.on(SystemEventType.TOUCH_CANCEL, this.onTouchCancel, this);
        systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.on(SystemEventType.KEY_UP, this.onKeyUp, this);
    }

    onDestroy(){
        systemEvent.off(SystemEventType.TOUCH_START, this.onTouchStart, this);
        systemEvent.off(SystemEventType.TOUCH_END, this.onTouchEnd, this);
        systemEvent.off(SystemEventType.TOUCH_MOVE, this.onTouchMove, this);
        systemEvent.off(SystemEventType.TOUCH_CANCEL, this.onTouchCancel, this);
        systemEvent.off(SystemEventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.off(SystemEventType.KEY_UP, this.onKeyUp, this);
    }

    onTouchStart(touch: Touch, event: EventTouch){
        this.labelShow.string = `TouchStart: ${event.getLocation()}`;
    }

    onTouchMove(touch: Touch, event: EventTouch){
        this.labelShow.string = `TouchMove: ${event.getLocation()}`;
    }

    onTouchEnd(touch: Touch, event: EventTouch){
        this.labelShow.string = 'TouchEnd';
    }

    onTouchCancel(touch: Touch, event: EventTouch){
        this.labelShow.string = 'TouchCancel';
    }

    onKeyDown(event: EventKeyboard){
        this.labelShow.string = `KeyDown: ${String.fromCharCode(event.keyCode)}`;
    }

    onKeyUp(){
        this.labelShow.string = `KeyUp`;
    }
}
