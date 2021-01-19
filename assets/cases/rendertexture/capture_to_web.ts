import { _decorator, Component, Node, RenderTexture, Sprite, Camera, SpriteFrame } from 'cc';
const { ccclass, property, menu } = _decorator;

@ccclass('CaptureToWeb')
@menu('RenderTexture/CaptureToWeb')
export class CaptureToWeb extends Component {
    @property(Sprite)
    public sprite: Sprite = null!;
    @property(Camera)
    public camera: Camera = null!;

    protected _renderTex: RenderTexture | null = null;

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

        const renderTex = this._renderTex = new RenderTexture();
        renderTex.reset({
            width: 128,
            height: 128,
        });
        this.camera.targetTexture = renderTex;
        sp.texture = renderTex;
        this.sprite.spriteFrame = sp;
        this.scheduleOnce(()=>{
            renderTex.resize(512, 512);
        },2);
    }

    onDestroy () {
        if (this._renderTex) {
            this._renderTex.destroy();
            this._renderTex = null;
        }
    }
}
