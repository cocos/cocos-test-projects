import { _decorator, Component, Vec3, tween, Quat, Tween } from "cc";
const { ccclass, property, menu } = _decorator;

/**
 * 老示例的兼容性测试
 * 
 * 如果是想要缓动 node 的属性，可以参考其它脚本
 */

@ccclass("tween-test")
@menu("tween/tween-test")
export class tweentest extends Component {

    _wpos: Vec3 = new Vec3(0, 0, 0);
    _wscale: Vec3 = new Vec3(1, 1, 1);
    _leuler: Vec3 = new Vec3(0, 0, 0);

    private tweenPos: Tween;
    private tweenScale: Tween;
    private tweenEuler: Tween;

    onLoad () {
        Vec3.copy(this._wpos, this.node.worldPosition);

        /**
         * 注意，这里的 easing 的值类型在 V1.1 已经变动了，为了测试旧版本的兼容性，这里没有将其改成正确的值
         */
        this.tweenPos = tween(this._wpos)
            .to(3, new Vec3(10, 10, 10), { easing: 'Bounce-InOut' })
            .to(3, new Vec3(0, 0, 0), { easing: 'elasticOut' })
            .union()
            .repeat(Infinity)

        Vec3.copy(this._wscale, this.node.worldScale);

        /**
         * 下面 Tween 中的 easing 是正确的
         */
        this.tweenScale = tween(this._wscale)
            .to(0.5, new Vec3(3, 3, 3), { easing: 'bounceInOut' })
            .to(0.5, new Vec3(1, 1, 1), { easing: 'elasticOut' })
            .union()
            .repeat(Infinity)

        Vec3.copy(this._leuler, this.node.eulerAngles);

        this.tweenEuler = tween(this._leuler)
            .to(4.5, new Vec3(360, 360, 360), { easing: 'bounceInOut' })
            .to(4.5, new Vec3(0, 0, 0), { easing: 'elasticOut' })
            .union()
            .repeat(Infinity)
    }

    onEnable () {
        this.tweenPos.start();
        this.tweenScale.start();
        this.tweenEuler.start();
    }

    onDisable () {
        this.tweenPos.stop();
        this.tweenScale.stop();
        this.tweenEuler.stop();
    }

    update () {
        this.node.worldPosition = this._wpos;
        this.node.worldScale = this._wscale;
        this.node.eulerAngles = this._leuler;
    }
}
