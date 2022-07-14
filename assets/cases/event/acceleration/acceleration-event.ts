import { _decorator, Component, Node, input, Input, EventAcceleration, Vec2, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('accelerationEvent')
export class accelerationEvent extends Component {

    @property(Node)
    public target: Node = null!;

    @property(Label)
    public btnLabel: Label = null!;

    @property
    speed: number = 10;

    acc: Vec2 = new Vec2(0, 0);
    accelerometerEnable: boolean = false;

    private _skipCallback = false;

    start () {
        this.accelerometerEnable = false;
        input.setAccelerometerInterval(0.5);
        input.on(Input.EventType.DEVICEMOTION,this.moveBall,this);
    }

    onDestroy () {
        input.off(Input.EventType.DEVICEMOTION,this.moveBall,this);
    }

    update (dt: number) {
        let pos = this.target.position;
        this.target.setPosition(pos.x + this.acc.x * dt * this.speed, pos.y);
        pos = this.target.position;
        this.target.setPosition(pos.x, pos.y, pos.z + (-this.acc.y) * dt * this.speed);
    }

    moveBall (event: EventAcceleration) {
        // on some platforms, stopping accelerometer is an asynchronous operation.
        // need to skip this callback after stopping.
        if (this._skipCallback) {
            return;
        }
        this.acc.x =  event.acc.x;
        this.acc.y =  event.acc.y;
    }

    onOpenAccelerometer () {
        this.accelerometerEnable = !this.accelerometerEnable;
        if (this.accelerometerEnable) {
            this.btnLabel.string = 'Accelerometer On';
        } else {
            this.btnLabel.string = 'Accelerometer Off';
        }

        if (!this.accelerometerEnable) {
            this.acc.x = 0;
            this.acc.y = 0;
        }
        input.setAccelerometerEnabled(this.accelerometerEnable);
        this._skipCallback = !this.accelerometerEnable;
    }

    resetPosition () {
        this.target.setPosition(0, 0.5, 0);
    }
}
