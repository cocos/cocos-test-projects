import { _decorator, Component, Node, Texture2D, UniformCurveValueAdapter, AnimationClip, MeshRenderer, ComponentModifier, js, Animation, error } from "cc";
const { ccclass, property } = _decorator;

/**
 * This component demonstrates how material texture animation run.
 */
@ccclass("MaterialTextureAnimation")
export class MaterialTextureAnimation extends Component {
    /**
     * Textures to be animated.
     */
    @property([Texture2D])
    textures: Texture2D[] = [];

    start () {
        const animationComponent = this.node.getComponent(Animation);
        if (!animationComponent) {
            error(`Animation component is required for this script.`);
            return;
        }
        const clip = createMaterialTextureAnimationClip(this.textures, 0);
        clip.name = 'forward';
        const clip2 = createMaterialTextureAnimationClip(this.textures, 1);
        clip2.name = 'deferred';
        animationComponent.clips = [ clip, clip2 ];
        animationComponent.defaultClip = clip;
        //animationComponent.playOnLoad = true;
        const state1 = animationComponent.getAnimationState('forward');
        state1.play();
        const state2 = animationComponent.getAnimationState('deferred');
        state2.play();
    }
}

function createMaterialTextureAnimationClip(textures: Texture2D[], passIndex: number) {
    // Animate every texture for 1 sec.
    const defaultKeys = textures.map((texture, index) => index);

    // Setup the value adapter.
    const uca = new UniformCurveValueAdapter();
    uca.passIndex = passIndex;
    uca.uniformName = 'albedoMap';

    const animationClip = new AnimationClip();
    animationClip.wrapMode = AnimationClip.WrapMode.Loop;
    animationClip.keys = [ defaultKeys ];
    animationClip.duration = defaultKeys[defaultKeys.length - 1] + 1;
    animationClip.curves = [{
        modifiers: [
            new ComponentModifier(js.getClassName(MeshRenderer)),
            'sharedMaterials',
            0,
        ],
        valueAdapter: uca,
        data: {
            keys: 0,
            values: textures,
        },
    }];
    return animationClip;
}
