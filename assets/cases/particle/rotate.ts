import { _decorator, Component, Node, Quat, Vec3, math } from "cc";
const { ccclass, property } = _decorator;

@ccclass("rotate")
export class rotate extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    @property
    public xAxis: boolean = false;
    @property
    public xTo: number = 0;
    @property
    public yAxis: boolean = false;
    @property
    public yTo: number = 0;
    @property
    public zAxis: boolean = false;
    @property
    public zTo: number = 0;
    @property
    public time: number = 0;
    @property
    public loop: boolean = false;

    private originEuler:Vec3 = new Vec3();
    private currT = 0;

    start () {
        // Your initialization goes here.
        this.originEuler.set(this.node.eulerAngles);
    }

    update (deltaTime: number) {
        // Your update function goes here.
        if (this.loop && this.currT + deltaTime > this.time) {
            return;
        }
        this.currT = math.repeat(this.currT + deltaTime, this.time);
        let x = this.xAxis ? math.lerp(this.originEuler.x, this.xTo, this.currT / this.time) : this.node.eulerAngles.x;
        let y = this.yAxis ? math.lerp(this.originEuler.y, this.yTo, this.currT / this.time) : this.node.eulerAngles.y;
        let z = this.zAxis ? math.lerp(this.originEuler.z, this.zTo, this.currT / this.time) : this.node.eulerAngles.z;
        this.node.setRotationFromEuler(x, y, z);
    }
}
