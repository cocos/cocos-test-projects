import { _decorator, Component, Node, Tween, tween, Vec3, Quat } from "cc";
const { ccclass, property } = _decorator;

@ccclass("TweenActionCallBack")
export class TweenActionCallBack extends Component {
    private tween!: Tween<Vec3>;
    private _scale = new Vec3(1, 1, 1);
    onLoad () {
        const that = this;
        let times = 0;
        this.tween = tween(this._scale)
            // 延迟 1s
            .delay(1)
            .by(1, new Vec3(1, 1, 1), {
                'onStart': () => {
                    // 第二遍开始的时候，移动node
                    if (times == 1) that.node.translate(new Vec3(0, 10, 0));
                },
                'onUpdate': () => {
                    that.node.scale = that._scale;
                },
                'onComplete': () => {
                    // 第三遍完成的时候, 旋转Node
                    if (times == 2) that.node.rotate(Quat.fromEuler(new Quat(), 0, 45, 0));
                    times++;
                }
            })
            .repeat(3)
    }

    onEnable () {
        this.tween.start()
    }

    onDisable () {
        this.tween.stop()
    }
}
