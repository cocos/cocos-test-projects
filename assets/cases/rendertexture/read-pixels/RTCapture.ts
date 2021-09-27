import { _decorator, Component, Node, RenderTexture, Sprite, Camera, SpriteFrame } from 'cc';
const { ccclass, property, menu } = _decorator;

@ccclass('RTCapture')
@menu('RenderTexture/RTCapture')
export class RTCapture extends Component {
    @property(Sprite)
    public sprite: Sprite = null!;
    @property(Camera)
    public camera: Camera = null!;

    static _renderTex: RenderTexture | null = null;

    start () {
        const spriteFrame = this.sprite.spriteFrame!;
        const sp = new SpriteFrame();
        sp.reset({
            originalSize: spriteFrame.originalSize,
            rect: spriteFrame.rect,
            offset: spriteFrame.offset,
            isRotate: spriteFrame.rotated,
            borderTop: spriteFrame.insetTop,
            borderLeft: spriteFrame.insetLeft,
            borderBottom: spriteFrame.insetBottom,
            borderRight: spriteFrame.insetRight,
        });

        const renderTex = RTCapture._renderTex = new RenderTexture();
        renderTex.reset({
            width: 256,
            height: 256,
        });
        this.camera.targetTexture = renderTex;
        sp.texture = renderTex;
        this.sprite.spriteFrame = sp;
        this.sprite.updateMaterial();
    }

    onDestroy () {
        if (RTCapture._renderTex) {
            RTCapture._renderTex.destroy();
            RTCapture._renderTex = null;
        }
    }
}
