import { _decorator, Component, Node, Vec3, tween, Tween } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("TweenCustomProgress")
@menu("tween/TweenCustomProgress")
export class TweenCustomProgress extends Component {

    private tweenCP!: Tween<Node>;

    onLoad () {
        // 对所有属性自定义 progress
        const scaleTween = tween(this.node)
            .to(2, { scale: new Vec3(3, 2, 1) }, {
                progress: (start: number, end: number, current: number, ratio: number) => {
                    return start + (end - start) * ratio;
                }
            })

        // 对单个属性自定义 progress
        this.tweenCP = tween(this.node)
            .to(2, { position: new Vec3(2, 2, -2) }, {
                progress: (start: number, end: number, current: number, ratio: number) => {
                    return start + (end - start) * ratio * ratio * ratio;
                }
            }).reverseTime(scaleTween)
    }

    onEnable () {
        this.tweenCP.start();
    }

    onDisable () {
        this.tweenCP.stop();
    }

}
