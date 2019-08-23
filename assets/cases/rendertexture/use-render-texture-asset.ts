import { _decorator, Component, Node, CameraComponent, RenderTexture, SpriteFrame, SpriteComponent } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("UseRenderTextureAsset")
@menu('RenderTexture/UseRenderTextureAsset')
export class UseRenderTextureAsset extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    @property(RenderTexture)
    render: RenderTexture = null;
    @property(SpriteComponent)
    content: SpriteComponent = null;

    start () {
        const renderTex = this.render;

        const camera = this.getComponent(CameraComponent);
        camera.targetTexture = renderTex;
        const spriteFrame = this.content.spriteFrame;
        const sp = new SpriteFrame();
        sp.reset({
            originalSize: spriteFrame.getOriginalSize(),
            rect: spriteFrame.getRect(),
            offset: spriteFrame.getOffset(),
            isRotate: spriteFrame.isRotated(),
        });
        sp.texture = renderTex;

        this.content.spriteFrame = sp;
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
