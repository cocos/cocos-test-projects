import { _decorator, Component, Node, tweenUtil, find, Vec3, Tween } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("TweenClone")
@menu("tween/TweenClone")
export class TweenClone extends Component {

    private tweenClone0: Tween;
    private tweenClone1: Tween;

    onLoad () {
        // 先创建一个缓动作为模板
        let tweenTemplate = tweenUtil({}).to(4, { scale: new Vec3(3, 3, 3) })

        // 复制 tween，并使用节点 cocos 作为 target
        this.tweenClone0 = tweenTemplate.clone(find('TweenClone/cocos'));

        // 复制 tween，并使用节点 cocos2 作为 target
        this.tweenClone1 = tweenTemplate.clone(find('TweenClone/cocos2'));
    }

    onEnable () {
        this.tweenClone0.start()
        this.tweenClone1.start()
    }

    onDisable () {
        this.tweenClone0.stop()
        this.tweenClone1.stop()
    }
}
