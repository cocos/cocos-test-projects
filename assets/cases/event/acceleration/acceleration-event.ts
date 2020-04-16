import { _decorator, Component, Node, systemEvent, SystemEventType, EventAcceleration, Vec2, CCInteger, LabelComponent, ButtonComponent } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('accelerationEvent')
export class accelerationEvent extends Component {

    @property(Node)
    target: Node = null;

    @property(LabelComponent)
    btnLabel: LabelComponent = null;

    @property
    speed: number = 10;

    acc: Vec2 = new Vec2(0, 0);
    accelerometerEnable: boolean = false;

    start () {
        this.accelerometerEnable = false;
        systemEvent.setAccelerometerInterval(0.5);
        systemEvent.on(SystemEventType.DEVICEMOTION,this.moveBall,this);
    }

    onDestroy () {
        systemEvent.off(SystemEventType.DEVICEMOTION,this.moveBall,this);
    }

    update (dt) {
        this.target.position.x += this.acc.x * dt * this.speed;
        this.target.position.z += (-this.acc.y) * dt * this.speed;
        this.target.setPosition(this.target.position.x,this.target.position.y,this.target.position.z);
    }

    moveBall (event: EventAcceleration) {
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
        systemEvent.setAccelerometerEnabled(this.accelerometerEnable);
    }

    resetPosition () {
        this.target.setPosition(0, 0.5, 0);
    }
}
