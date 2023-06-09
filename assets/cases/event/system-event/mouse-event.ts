import { _decorator, Component, input, Label, EventMouse, Input, view, sys, Node } from "cc";
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
        if (sys.isMobile && !sys.hasFeature(sys.Feature.HPE)) {
            this.notSupported.active = true;
            return;
        }
        const canvasSize = view.getCanvasSize();
        this.tip.string = this.tip.string.replace('{{width}}', canvasSize.width.toString());
        this.tip.string = this.tip.string.replace('{{height}}', canvasSize.height.toString());
        input.on(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
        input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this);
        input.on(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
        input.on(Input.EventType.MOUSE_WHEEL, this.onMouseScroll, this);
    }

    onDestroy(){
        input.off(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
        input.off(Input.EventType.MOUSE_UP, this.onMouseUp, this);
        input.off(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
        input.off(Input.EventType.MOUSE_WHEEL, this.onMouseScroll, this);
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
