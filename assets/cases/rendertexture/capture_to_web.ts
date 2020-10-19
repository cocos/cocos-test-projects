import { _decorator, Component, Node, RenderTexture, SpriteComponent, CameraComponent, SpriteFrame, cclegacy } from 'cc';
const { ccclass, property, menu } = _decorator;

@ccclass('CaptureToWeb')
@menu('RenderTexture/CaptureToWeb')
export class CaptureToWeb extends Component {
    @property(SpriteComponent)
    sprite: SpriteComponent = null;
    @property(CameraComponent)
    camera: CameraComponent = null;

    protected _renderTex: RenderTexture = null;

    start () {
        const spriteframe = this.sprite.spriteFrame;
        const sp = new SpriteFrame();
        sp.reset({
            originalSize: spriteframe.getOriginalSize(),
            rect: spriteframe.getRect(),
            offset: spriteframe.getOffset(),
            isRotate: spriteframe.isRotated(),
            borderTop: spriteframe.insetTop,
            borderLeft: spriteframe.insetLeft,
            borderBottom: spriteframe.insetBottom,
            borderRight: spriteframe.insetRight,
        });

        const rendetTex = this._renderTex = new RenderTexture();
        rendetTex.reset({
            width: 128,
            height: 128,
        });
        this.camera.targetTexture = rendetTex;
        sp.texture = rendetTex;
        this.sprite.spriteFrame = sp;
        this.scheduleOnce(()=>{
            rendetTex.resize(512, 512);
        },2);
    }
}
