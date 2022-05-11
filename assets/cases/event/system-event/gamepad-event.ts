import { _decorator, Component, Node, ProgressBar, EventGamepad, input, Input, GamepadCode, Vec2, UITransform, Vec3, v3, Graphics, Color, sys } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('gamepad_event')
export class gamepad_event extends Component {

    @property(Node)
    public supportTip: Node = null!;

    @property(ProgressBar)
    public L1: ProgressBar = null!;
    @property(ProgressBar)
    public L2: ProgressBar = null!;
    @property(ProgressBar)
    public L3: ProgressBar = null!;
    @property(ProgressBar)
    public R1: ProgressBar = null!;
    @property(ProgressBar)
    public R2: ProgressBar = null!;
    @property(ProgressBar)
    public R3: ProgressBar = null!;

    @property(ProgressBar)
    public BtnA: ProgressBar = null!;
    @property(ProgressBar)
    public BtnB: ProgressBar = null!;
    @property(ProgressBar)
    public BtnX: ProgressBar = null!;
    @property(ProgressBar)
    public BtnY: ProgressBar = null!;

    @property(ProgressBar)
    public Up: ProgressBar = null!;
    @property(ProgressBar)
    public Down: ProgressBar = null!;
    @property(ProgressBar)
    public Left: ProgressBar = null!;
    @property(ProgressBar)
    public Right: ProgressBar = null!;
    
    @property(ProgressBar)
    public Share: ProgressBar = null!;
    @property(ProgressBar)
    public Options: ProgressBar = null!;
    @property(ProgressBar)
    public Home: ProgressBar = null!;
    @property(ProgressBar)
    public Touchpad: ProgressBar = null!;

    @property(Graphics)
    public graphicsLeft: Graphics = null!;
    @property(Graphics)
    public graphicsRight: Graphics = null!;

    private _leftStickPos: Vec3 = null!;
    private _rightStickPos: Vec3 = null!;
    private _stickMoveDistance = 50;

    onLoad() {
        if (!sys.hasFeature(sys.Feature.EVENT_GAMEPAD)) {
            this.supportTip.active = true;
            return;
        }
        input.on(Input.EventType.GAMEPAD_INPUT, this.gamepadInput, this);

        this._leftStickPos = this.L3.node.position.clone();
        this._rightStickPos = this.R3.node.position.clone();

        this.graphicsLeft.circle(0, 0, this._stickMoveDistance+10);
        this.graphicsLeft.stroke();
        this.graphicsRight.circle(0, 0, this._stickMoveDistance+10);
        this.graphicsRight.stroke();
    }

    onDestroy () {
        input.off(Input.EventType.GAMEPAD_INPUT, this.gamepadInput, this);
    }

    gamepadInput (e: EventGamepad) {
        const gamepad = e.gamepads[0];
        this.L1.progress =  gamepad.getValue(GamepadCode.L1);
        this.L2.progress = gamepad.getValue(GamepadCode.L2);
        this.L3.progress = gamepad.getValue(GamepadCode.L3);
        this.R1.progress = gamepad.getValue(GamepadCode.R1);
        this.R2.progress = gamepad.getValue(GamepadCode.R2);
        this.R3.progress = gamepad.getValue(GamepadCode.R3);

        this.BtnA.progress =  gamepad.getValue(GamepadCode.A);
        this.BtnB.progress = gamepad.getValue(GamepadCode.B);
        this.BtnX.progress = gamepad.getValue(GamepadCode.X);
        this.BtnY.progress = gamepad.getValue(GamepadCode.Y);

        this.Up.progress =  gamepad.getValue(GamepadCode.DPAD_UP);
        this.Down.progress = gamepad.getValue(GamepadCode.DPAD_DOWN);
        this.Left.progress = gamepad.getValue(GamepadCode.DPAD_LEFT);
        this.Right.progress = gamepad.getValue(GamepadCode.DPAD_RIGHT);

        this.Share.progress = gamepad.getValue(GamepadCode.SHARE) || gamepad.getValue(GamepadCode.NS_MINUS);
        this.Options.progress = gamepad.getValue(GamepadCode.OPTIONS) || gamepad.getValue(GamepadCode.NS_PLUS);
        this.Home.progress = gamepad.getValue(GamepadCode.HOME);
        this.Touchpad.progress = gamepad.getValue(GamepadCode.TOUCHPAD);

        const lAxisX = gamepad.getValue(GamepadCode.AXIS_LEFT_STICK_X);
        const lAxisY = gamepad.getValue(GamepadCode.AXIS_LEFT_STICK_Y);
        const rAxisX = gamepad.getValue(GamepadCode.AXIS_RIGHT_STICK_X);
        const rAxisY = gamepad.getValue(GamepadCode.AXIS_RIGHT_STICK_Y);

        this.L3.node.setPosition(v3(this._leftStickPos.x + this._stickMoveDistance * lAxisX, this._leftStickPos.y + this._stickMoveDistance * lAxisY, 0));
        this.R3.node.setPosition(v3(this._rightStickPos.x + this._stickMoveDistance * rAxisX, this._rightStickPos.y + this._stickMoveDistance * rAxisY, 0));
    }
}


