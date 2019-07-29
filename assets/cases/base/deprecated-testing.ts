import { _decorator, Component, Node, SpriteFrame, AnimationComponent, AnimationClip, misc, macro, Texture2D } from "cc";
const { ccclass, property } = _decorator;

@ccclass("deprecated-testing")
export class deprecatedtesting extends Component {

    start () {

        // deprecated testing
        let anicom = new AnimationComponent();
        let clip = new AnimationClip();
        anicom.addClip(clip, 'clip');
        anicom.getAnimationState('clip');

        // remove testing
        cc.misc.clampf();
        cc.misc.lerp();
        //@ts-ignore
        misc.clampf();
        //@ts-ignore
        misc.lerp();

        //warning testing
        let tex2d = new Texture2D();
        tex2d.releaseTexture();
        tex2d.getHtmlElementObj();

    }

}
