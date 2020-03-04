import { _decorator, Component, systemEvent, SystemEventType, LabelComponent, EventMouse } from "cc";
const { ccclass, property } = _decorator;

@ccclass("systemEventPC")
export class systemEventPC extends Component {

    @property(LabelComponent)
    labelShow: LabelComponent = null;

    start () {
        systemEvent.on(SystemEventType.MOUSE_DOWN, this.onMouseDown, this);
        systemEvent.on(SystemEventType.MOUSE_UP, this.onMouseUp, this);
        systemEvent.on(SystemEventType.MOUSE_MOVE, this.onMouseMove, this);
        systemEvent.on(SystemEventType.MOUSE_WHEEL, this.onMouseScroll, this);
        systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.on(SystemEventType.KEY_UP, this.onKeyUp, this);
    }

    onDestroy(){
        systemEvent.off(SystemEventType.MOUSE_DOWN, this.onMouseDown, this);
        systemEvent.off(SystemEventType.MOUSE_UP, this.onMouseUp, this);
        systemEvent.off(SystemEventType.MOUSE_MOVE, this.onMouseMove, this);
        systemEvent.off(SystemEventType.MOUSE_WHEEL, this.onMouseScroll, this);
        systemEvent.off(SystemEventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.off(SystemEventType.KEY_UP, this.onKeyUp, this);
    }

    onMouseDown(event: EventMouse){
        this.labelShow.string = `MOUSE_DOWN: ${event.getLocation()}`;
    }

    onMouseMove(event: EventMouse){
        this.labelShow.string = `MOUSE_MOVE: ${event.getLocation()}`;
    }

    onMouseUp(event: EventMouse){
        this.labelShow.string = 'MOUSE_UP';
    }

    onMouseScroll(event: EventMouse){
        this.labelShow.string = `MOUSE_SCROLL: ${event.getScrollY()}`;
    }

    onTouchCancel(event: EventMouse){
        this.labelShow.string = 'MOUSE_LEAVE';
    }

    onKeyDown(event){
        this.labelShow.string = `KeyDown: ${String.fromCharCode(event.keyCode)}`;
    }

    onKeyUp(){
        this.labelShow.string = `KeyUp`;
    }
}
