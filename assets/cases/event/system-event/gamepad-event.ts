import { _decorator, Component, Node, Toggle, Label, ProgressBar, EventGamepad, input, Input, GamepadCode, Vec2, UITransform, Vec3, v3, Graphics, Color, sys, Gamepad, view } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('gamepad_event')
export class gamepad_event extends Component {

    @property(Node)
    public supportTip: Node = null!;

    @property(Label)
    public joystickInfo: Label = null!;

    @property(Toggle)
    public gamePad1: Toggle = null!;

    @property(Toggle)
    public gamePad2: Toggle = null!;

    @property(Toggle)
    public gamePad3: Toggle = null!;

    @property(Toggle)
    public gamePad4: Toggle = null!;

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
    // @property(ProgressBar)
    // public Home: ProgressBar = null!;
    // @property(ProgressBar)
    // public TouchPad: ProgressBar = null!;

    @property(Graphics)
    public graphicsLeft: Graphics = null!;
    @property(Graphics)
    public graphicsRight: Graphics = null!;

    private _leftStickPos: Vec3 = null!;
    private _rightStickPos: Vec3 = null!;
    private _stickMoveDistance = 50;
    
    private _gamepadArray: Array<{deviceId: number, toggle: Toggle}> = new Array();

    onLoad() {
        if (!sys.hasFeature(sys.Feature.EVENT_GAMEPAD)) {
            this.supportTip.active = true;
            return;
        }
        input.on(Input.EventType.GAMEPAD_INPUT, this.gamepadInput, this);
        input.on(Input.EventType.GAMEPAD_CHANGE, this.gamepadChange, this);

        this.gamePad1.node.active = false;
        this.gamePad2.node.active = false;
        this.gamePad3.node.active = false;
        this.gamePad4.node.active = false;

        this._leftStickPos = this.L3.node.position.clone();
        this._rightStickPos = this.R3.node.position.clone();

        this.graphicsLeft.circle(0, 0, this._stickMoveDistance+10);
        this.graphicsLeft.stroke();
        this.graphicsRight.circle(0, 0, this._stickMoveDistance+10);
        this.graphicsRight.stroke();
        this._gamepadArray.push({deviceId:-1, toggle: this.gamePad1});
        this._gamepadArray.push({deviceId:-1, toggle: this.gamePad2});
        this._gamepadArray.push({deviceId:-1, toggle: this.gamePad3});
        this._gamepadArray.push({deviceId:-1, toggle: this.gamePad4});
    }

    onDestroy () {
        input.off(Input.EventType.GAMEPAD_INPUT, this.gamepadInput, this);
    }

    gamepadChange(e: EventGamepad) {
        const gp = e.gamepad;
        console.debug(`连接手柄：设备ID  ${gp.deviceId}   设备状态 ${gp.connected} `);
        this.updateGamepad(e);
    }

    updateGamepad(e: EventGamepad) {
        const gp = e.gamepad;
        for(let i = 0; i < this._gamepadArray.length; ++i) {
            const item = this._gamepadArray[i];
            if(item.deviceId == -1 && gp.connected) {
                item.deviceId = gp.deviceId;
                item.toggle.node.active = gp.connected;
                return;
            } else if(item.deviceId != -1 && item.deviceId == gp.deviceId && !gp.connected) {
                item.deviceId = -1;
                item.toggle.node.active = gp.connected;
                return;
            }
        }
        console.warn(`2个以上手柄，或者异常: 设备ID  ${gp.deviceId}   设备状态 ${gp.connected} `);
    }

    gamepadInput (e: EventGamepad) {
        const gp = e.gamepad;
        if(!gp.connected) {
            console.warn(`这个设备ID：${gp.deviceId} 的状态不应该是未链接`);
        }
        let isGamepadExist = false;
        for(let i = 0; i < this._gamepadArray.length; ++i) {
            const item = this._gamepadArray[i];
            if(gp.deviceId != item.deviceId) {
                continue;
            }
            isGamepadExist = true;
            if(gp.deviceId === item.deviceId && (item.toggle.node.active == false || (item.toggle.node.active == true && !item.toggle.isChecked)) ) {
                return;
            }
        }
        if(!isGamepadExist) {
            this.updateGamepad(e);
        }

        this.joystickInfo.string = '手柄ID: ' + gp.deviceId;
        console.debug(`${this.joystickInfo.string}`);
        this.L1.progress =  gp.buttonL1.getValue();
        console.debug(`    L1 : ${gp.buttonL1.getValue()}`);

        this.L2.progress = gp.buttonL2.getValue();
        console.debug(`    L2 : ${gp.buttonL2.getValue()}`);

        this.L3.progress = gp.buttonL3.getValue();
        console.debug(`    L3 : ${gp.buttonL3.getValue()}`);

        this.R1.progress = gp.buttonR1.getValue();
        console.debug(`    R1 : ${gp.buttonR1.getValue()}`);

        this.R2.progress = gp.buttonR2.getValue();
        console.debug(`    R2 : ${gp.buttonR2.getValue()}`);

        this.R3.progress = gp.buttonR3.getValue();
        console.debug(`    R3 : ${gp.buttonR3.getValue()}`);

        this.BtnSouth.progress =  gp.buttonSouth.getValue();
        console.debug(`    buttonSouth : ${gp.buttonSouth.getValue()}`);
        this.BtnEast.progress = gp.buttonEast.getValue();
        console.debug(`    buttonEast : ${gp.buttonEast.getValue()}`);
        this.BtnWest.progress = gp.buttonWest.getValue();
        console.debug(`    buttonWest : ${gp.buttonWest.getValue()}`);
        this.BtnNorth.progress = gp.buttonNorth.getValue();
        console.debug(`    buttonNorth : ${gp.buttonNorth.getValue()}`);

        this.Up.progress =  gp.dpad.up.getValue();
        console.debug(`    dpad.up : ${gp.dpad.up.getValue()}`);
        this.Down.progress = gp.dpad.down.getValue();
        console.debug(`    dpad.down : ${gp.dpad.down.getValue()}`);
        this.Left.progress = gp.dpad.left.getValue();
        console.debug(`    dpad.left : ${gp.dpad.left.getValue()}`);
        this.Right.progress = gp.dpad.right.getValue();
        console.debug(`    dpad.right : ${gp.dpad.right.getValue()}`);

        this.Share.progress = gp.buttonShare.getValue();
        console.debug(`    Share.progress : ${gp.buttonShare.getValue()}`);
        
        this.Options.progress = gp.buttonOptions.getValue();
        console.debug(`    Options.progress : ${gp.buttonOptions.getValue()}`);
        // this.Home.progress = gp.buttonHome.getValue();

        // this.TouchPad.progress = gp.buttonTouchPad.getValue();

        const ls = gp.leftStick.getValue();
        console.debug(`    ls : ${gp.leftStick.getValue()}`);

        const rs = gp.rightStick.getValue();
        console.debug(`    rs : ${gp.rightStick.getValue()}`);

        this.L3.node.setPosition(v3(this._leftStickPos.x + this._stickMoveDistance * ls.x, this._leftStickPos.y + this._stickMoveDistance * ls.y, 0));
        this.R3.node.setPosition(v3(this._rightStickPos.x + this._stickMoveDistance * rs.x, this._rightStickPos.y + this._stickMoveDistance * rs.y, 0));
    }
}


