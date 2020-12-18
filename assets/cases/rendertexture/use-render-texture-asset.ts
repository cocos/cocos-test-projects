import { _decorator, Component, Node, Camera, RenderTexture, SpriteFrame, Sprite } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("UseRenderTextureAsset")
@menu('RenderTexture/UseRenderTextureAsset')
export class UseRenderTextureAsset extends Component {

    @property(RenderTexture)
    public render: RenderTexture = null!;
    @property(Sprite)
    public content: Sprite = null!;

    start () {
        const renderTex = this.render;

        const camera = this.getComponent(Camera)!;
        camera.targetTexture = renderTex;
        const spriteFrame = this.content.spriteFrame!;
        const sp = new SpriteFrame();
        sp.reset({
            originalSize: spriteFrame.originalSize,
            rect: spriteFrame.rect,
            offset: spriteFrame.offset,
            isRotate: spriteFrame.rotated,
        });
        sp.texture = renderTex;

        this.content.spriteFrame = sp;
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
