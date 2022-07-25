import { _decorator, Component, input, Label, EventTouch, Touch, Input, Node, sys, view } from "cc";
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
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        input.on(Input.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    }

    onDestroy(){
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        input.off(Input.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    }

    onTouchStart(event: EventTouch){
        this.labelShow.string = `TouchStart: ${event.getLocation()}`;
    }

    onTouchMove(event: EventTouch){
        this.labelShow.string = `TouchMove: ${event.getLocation()}`;
    }

    onTouchEnd(event: EventTouch){
        this.labelShow.string = `TouchEnd: ${event.getLocation()}`;
    }

    onTouchCancel(event: EventTouch){
        this.labelShow.string = `TouchCancel`;
    }
}
