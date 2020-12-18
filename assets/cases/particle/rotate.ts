import { _decorator, Component, Vec3, math } from "cc";
const { ccclass, property } = _decorator;

@ccclass("rotate")
export class rotate extends Component {

    @property
    public xAxis = false;
    @property
    public xTo = 0;
    @property
    public yAxis = false;
    @property
    public yTo = 0;
    @property
    public zAxis = false;
    @property
    public zTo = 0;
    @property
    public time = 0;
    @property
    public loop = false;

    private originEuler:Vec3 = new Vec3();
    private currT = 0;

    start () {
        // Your initialization goes here.
        this.originEuler.set(this.node.eulerAngles);
    }

    update (dt: number) {
        // Your update function goes here.
        if (this.loop && this.currT + dt > this.time) {
            return;
        }
        this.currT = math.repeat(this.currT + dt, this.time);
        let x = this.xAxis ? math.lerp(this.originEuler.x, this.xTo, this.currT / this.time) : this.node.eulerAngles.x;
        let y = this.yAxis ? math.lerp(this.originEuler.y, this.yTo, this.currT / this.time) : this.node.eulerAngles.y;
        let z = this.zAxis ? math.lerp(this.originEuler.z, this.zTo, this.currT / this.time) : this.node.eulerAngles.z;
        this.node.setRotationFromEuler(x, y, z);
    }
}
