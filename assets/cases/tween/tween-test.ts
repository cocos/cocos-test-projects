import { _decorator, Component, Vec3, tweenUtil, Quat } from "cc";
const { ccclass, property } = _decorator;

@ccclass("tween-test")
export class tweentest extends Component {

    _wpos: Vec3 = new Vec3(0, 0, 0);
    _wscale: Vec3 = new Vec3(1, 1, 1);
    _leuler: Vec3 = new Vec3(0, 0, 0);

    start () {
        // Your initialization goes here.
        Vec3.copy(this._wpos, this.node.worldPosition);

        tweenUtil(this._wpos)
            .to(3, new Vec3(10, 10, 10), { easing: 'Bounce-InOut' })
            .to(3, new Vec3(0, 0, 0), { easing: 'Elastic-Out' })
            .union()
            .repeat(Infinity)
            .start();

        Vec3.copy(this._wscale, this.node.worldScale);

        tweenUtil(this._wscale)
            .to(0.5, new Vec3(3, 3, 3), { easing: 'Bounce-InOut' })
            .to(0.5, new Vec3(1, 1, 1), { easing: 'Elastic-Out' })
            .union()
            .repeat(Infinity)
            .start();

        Vec3.copy(this._leuler, this.node.eulerAngles);

        tweenUtil(this._leuler)
            .to(4.5, new Vec3(360, 360, 360), { easing: 'Bounce-InOut' })
            .to(4.5, new Vec3(0, 0, 0), { easing: 'Elastic-Out' })
            .union()
            .repeat(Infinity)
            .start();
    }

    update () {
        this.node.worldPosition = this._wpos;
        this.node.worldScale = this._wscale;
        this.node.eulerAngles = this._leuler;
    }
}
