import { _decorator, Component, Vec3, tweenUtil } from "cc";
const { ccclass, property } = _decorator;
declare const TWEEN: any;

@ccclass("tween-test")
export class tweentest extends Component {

    _wpos: Vec3 = new Vec3(0, 0, 0);
    _wscale: Vec3 = new Vec3(1, 1, 1);

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
    }

    update (deltaTime: number) {
        // Your update function goes here.
        this.node.worldPosition = this._wpos;
        this.node.worldScale = this._wscale;
    }
}
