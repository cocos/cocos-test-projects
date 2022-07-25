import { _decorator, Component, Vec3, Button, tween, EventTouch, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass
export class ButtonScaler extends Component {
    @property
    public scaleTo = new Vec3(1.2, 1.2, 1.2);
    @property
    public transDuration = 0.2;

    public initScale = new Vec3();
    public button: Button | null = null;
    private _scale = new Vec3(1, 1, 1);
    private _lastScale = new Vec3();
    private _start = new Vec3();

    // use this for initialization
    onLoad() {
        var self = this;
        self.initScale = this.node.scale;
        self.button = self.getComponent(Button);
        const tweenDown = tween(this._scale);
        const tewenUp = tween(this._scale);
        this.node.getScale(this._start);
        tweenDown.to(this.transDuration, this.scaleTo, { easing: 'cubicInOut'});
        tewenUp.to(this.transDuration, this._start, { easing: 'cubicInOut' });
        this._lastScale.set(this._scale);
        function onTouchDown(event: EventTouch) {
            tweenDown.start();
        }
        function onTouchUp(event: EventTouch) {
            tweenDown.stop();
            tewenUp.start();
        }
        this.node.on(Node.EventType.TOUCH_START, onTouchDown, this);
        this.node.on(Node.EventType.TOUCH_END, onTouchUp, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, onTouchUp, this);
    }

    update() {
        if(!this._scale.equals(this._lastScale)){
            this.node.setScale(this._scale);
            this._lastScale.set(this._scale);
        }
    }
}
