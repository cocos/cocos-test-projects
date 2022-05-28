import { _decorator, Component, Node, ProgressBar, EventGamepad, input, Input, GamepadCode, Vec2, UITransform, Vec3, v3, Graphics, Color, sys, Gamepad } from 'cc';
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
    public BtnSouth: ProgressBar = null!;
    @property(ProgressBar)
    public BtnEast: ProgressBar = null!;
    @property(ProgressBar)
    public BtnWest: ProgressBar = null!;
    @property(ProgressBar)
    public BtnNorth: ProgressBar = null!;

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
    public TouchPad: ProgressBar = null!;

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
        const gp = e.gamepad;

        this.L1.progress =  gp.buttonL1.getValue();
        this.L2.progress = gp.buttonL2.getValue();
        this.L3.progress = gp.buttonL3.getValue();
        this.R1.progress = gp.buttonR1.getValue();
        this.R2.progress = gp.buttonR2.getValue();
        this.R3.progress = gp.buttonR3.getValue();

        this.BtnSouth.progress =  gp.buttonSouth.getValue();
        this.BtnEast.progress = gp.buttonEast.getValue();
        this.BtnWest.progress = gp.buttonWest.getValue();
        this.BtnNorth.progress = gp.buttonNorth.getValue();

        this.Up.progress =  gp.dpad.up.getValue();
        this.Down.progress = gp.dpad.down.getValue();
        this.Left.progress = gp.dpad.left.getValue();
        this.Right.progress = gp.dpad.right.getValue();

        this.Share.progress = gp.buttonShare.getValue();
        this.Options.progress = gp.buttonOptions.getValue();
        this.Home.progress = gp.buttonHome.getValue();

        this.TouchPad.progress = gp.buttonTouchPad.getValue();

        const ls = gp.leftStick.getValue();
        const rs = gp.rightStick.getValue();
        this.L3.node.setPosition(v3(this._leftStickPos.x + this._stickMoveDistance * ls.x, this._leftStickPos.y + this._stickMoveDistance * ls.y, 0));
        this.R3.node.setPosition(v3(this._rightStickPos.x + this._stickMoveDistance * rs.x, this._rightStickPos.y + this._stickMoveDistance * rs.y, 0));
    }
}


