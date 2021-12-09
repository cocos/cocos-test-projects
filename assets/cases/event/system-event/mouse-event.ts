import { _decorator, Component, systemEvent, Label, EventMouse, SystemEvent, view, sys, Node } from "cc";
import { HTML5 } from "cc/env";
const { ccclass, property } = _decorator;

@ccclass("systemEventPC")
export class systemEventPC extends Component {

    @property(Label)
    public labelShow: Label = null!;

    @property(Label)
    public tip: Label = null!;

    @property(Node)
    public notSupported: Node = null!;

    private _ignoreMoveEvent = false;
    private _timeoutId = -1;

    onLoad () {
        if (sys.isMobile) {
            this.notSupported.active = true;
            return;
        }
        const canvasSize = view.getCanvasSize();
        this.tip.string = this.tip.string.replace('{{width}}', canvasSize.width.toString());
        this.tip.string = this.tip.string.replace('{{height}}', canvasSize.height.toString());
        systemEvent.on(SystemEvent.EventType.MOUSE_DOWN, this.onMouseDown, this);
        systemEvent.on(SystemEvent.EventType.MOUSE_UP, this.onMouseUp, this);
        systemEvent.on(SystemEvent.EventType.MOUSE_MOVE, this.onMouseMove, this);
        systemEvent.on(SystemEvent.EventType.MOUSE_WHEEL, this.onMouseScroll, this);
    }

    onDestroy(){
        systemEvent.off(SystemEvent.EventType.MOUSE_DOWN, this.onMouseDown, this);
        systemEvent.off(SystemEvent.EventType.MOUSE_UP, this.onMouseUp, this);
        systemEvent.off(SystemEvent.EventType.MOUSE_MOVE, this.onMouseMove, this);
        systemEvent.off(SystemEvent.EventType.MOUSE_WHEEL, this.onMouseScroll, this);
    }

    onMouseDown(event: EventMouse) {
        this.labelShow.string = `MOUSE_DOWN: ${event.getLocation()}`;
    }

    onMouseMove(event: EventMouse) {
        // NOTE: bug on Windows Web platform, 'mouse-move' event is dispatched after 'mouse-up' event, even if you don't move your mouse.
        if (this._ignoreMoveEvent) {
            return;
        }
        this.labelShow.string = `MOUSE_MOVE: ${event.getLocation()}`;
    }

    onMouseUp(event: EventMouse) {
        if (HTML5 && sys.os === sys.OS.WINDOWS) {
            this._ignoreMoveEvent = true;
            if (this._timeoutId !== -1) {
                clearTimeout(this._timeoutId);
            }
            this._timeoutId = setTimeout(() => {
                this._ignoreMoveEvent = false;
                this._timeoutId = -1
            }, 100);
        }
        this.labelShow.string = `MOUSE_UP: ${event.getLocation()}`;
    }

    onMouseScroll(event: EventMouse){
        this.labelShow.string = `MOUSE_SCROLL: ${event.getScrollY()}`;
    }
}
