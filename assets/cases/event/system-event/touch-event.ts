import { _decorator, Component, systemEvent, Label, EventTouch, Touch, SystemEvent, Node, sys, view } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("SystemEventTest")
export class SystemEventTest extends Component {

    @property(Label)
    public labelShow: Label = null!;

    @property(Label)
    public tip: Label = null!;

    @property(Node)
    public notSupported: Node = null!;

    onLoad () {
        // NOTE: we've simulated touch event on PC end for now
        // if (!sys.isMobile) {
        //     this.notSupported.active = true;
        //     return;
        // }
        const canvasSize = view.getCanvasSize();
        this.tip.string = this.tip.string.replace('{{width}}', canvasSize.width.toString());
        this.tip.string = this.tip.string.replace('{{height}}', canvasSize.height.toString());
        systemEvent.on(SystemEvent.EventType.TOUCH_START, this.onTouchStart, this);
        systemEvent.on(SystemEvent.EventType.TOUCH_END, this.onTouchEnd, this);
        systemEvent.on(SystemEvent.EventType.TOUCH_MOVE, this.onTouchMove, this);
        systemEvent.on(SystemEvent.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    }

    onDestroy(){
        systemEvent.off(SystemEvent.EventType.TOUCH_START, this.onTouchStart, this);
        systemEvent.off(SystemEvent.EventType.TOUCH_END, this.onTouchEnd, this);
        systemEvent.off(SystemEvent.EventType.TOUCH_MOVE, this.onTouchMove, this);
        systemEvent.off(SystemEvent.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    }

    onTouchStart(touch: Touch, event: EventTouch){
        this.labelShow.string = `TouchStart: ${event.getLocation()}`;
    }

    onTouchMove(touch: Touch, event: EventTouch){
        this.labelShow.string = `TouchMove: ${event.getLocation()}`;
    }

    onTouchEnd(touch: Touch, event: EventTouch){
        this.labelShow.string = `TouchEnd: ${event.getLocation()}`;
    }

    onTouchCancel(touch: Touch, event: EventTouch){
        this.labelShow.string = `TouchCancel`;
    }
}
