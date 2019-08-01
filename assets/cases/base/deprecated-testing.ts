import { _decorator, Component, Node, SpriteFrame, AnimationComponent, AnimationClip, macro, Texture2D, math } from "cc";
const { ccclass, property } = _decorator;

@ccclass("deprecated-testing")
export class deprecatedtesting extends Component {

    start () {

        let anim = this.node.addComponent(AnimationComponent);
        let clip = new AnimationClip('DD');
        // API 更名
        console.log(anim.addClip(clip));
        // API 更名 + 参数不兼容
        console.log(anim.removeClip(clip));

    }

}
