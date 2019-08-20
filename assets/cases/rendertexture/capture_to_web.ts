import { _decorator, Component, Node, RenderTexture, SpriteComponent, CameraComponent } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("CaptureToWeb")
@menu('RenderTexture/CaptureToWeb')
export class CaptureToWeb extends Component {
    @property(SpriteComponent)
    sprite: SpriteComponent = null;
    @property(CameraComponent)
    camera: CameraComponent = null;

    protected _renderTex: RenderTexture = null;

    start () {
        const spriteframe = this.sprite.spriteFrame;
        const rendetTex = this._renderTex = new RenderTexture();
        rendetTex.reset({ width: 512, height: 512,colorFormat: RenderTexture.PixelFormat.RGBA8888, depthStencilFormat: RenderTexture.DepthStencilFormat.DEPTH_32_STENCIL_8 });
        this.camera.targetTexture = rendetTex;
        spriteframe.texture = rendetTex;
    }
}
