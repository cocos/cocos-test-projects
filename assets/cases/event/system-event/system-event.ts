import { _decorator, Component, systemEvent, SystemEventType, LabelComponent, EventTouch } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("SystemEvent")
@menu('Event/SystemEvent')
export class SystemEvent extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    @property(LabelComponent)
    labelShow: LabelComponent = null;

    start () {
        systemEvent.on(SystemEventType.TOUCH_START, this.onTouchStart, this);
        systemEvent.on(SystemEventType.TOUCH_END, this.onTouchEnd, this);
        systemEvent.on(SystemEventType.TOUCH_MOVE, this.onTouchMove, this);
        systemEvent.on(SystemEventType.TOUCH_CANCEL, this.onTouchCancel, this);
        systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.on(SystemEventType.KEY_UP, this.onKeyUp, this);
    }

    onTouchStart(event: EventTouch){
        this.labelShow.string = `TouchStart: ${event.getLocation()}`;
    }

    onTouchMove(event: EventTouch){
        this.labelShow.string = `TouchMove: ${event.getLocation()}`;
    }

    onTouchEnd(event: EventTouch){
        this.labelShow.string = 'TouchEnd';
    }

    onTouchCancel(event: EventTouch){
        this.labelShow.string = 'TouchCancel';
    }

    onKeyDown(event){
        this.labelShow.string = `KeyDown: ${String.fromCharCode(event.keyCode)}`;
    }

    onKeyUp(){
        this.labelShow.string = `KeyUp`;
    }
}
