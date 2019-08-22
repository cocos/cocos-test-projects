import { _decorator, Component, Node, AnimationClip, AnimationComponent } from "cc";
const { ccclass, property } = _decorator;

@ccclass("AnimationWrapMode")
export class AnimationWrapMode extends Component {

    @property({ type: AnimationClip.WrapMode })
    wrapMode: number = AnimationClip.WrapMode.Default;

    __preload () {
        // Your initialization goes here.
        const animationCom = this.getComponent(AnimationComponent);
        if (animationCom) {
            const clips = animationCom.clips;
            for (let i = 0; i < clips.length; i++) {
                const clip = clips[i];                
                clip.wrapMode = this.wrapMode;                
            }
        }
    }

}
