import { _decorator, Component, Node, RenderTexture, SpriteComponent, CameraComponent, SpriteFrame, cclegacy } from "cc";
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
            width: 256,
            height: 256,
            colorFormat: cclegacy.director.root.device.colorFormat,
            depthStencilFormat: cclegacy.director.root.device.depthStencilFormat
        });
        this.camera.targetTexture = rendetTex;
        sp.texture = rendetTex;
        this.sprite.spriteFrame = sp;
        this.scheduleOnce(()=>{
            rendetTex.reset({
                width: 512,
                height: 512,
                colorFormat: cclegacy.director.root.device.colorFormat,
                depthStencilFormat: cclegacy.director.root.device.depthStencilFormat
            });
        },2);
    }
}
