import { _decorator, Component, Node, RenderTexture, SpriteComponent, ImageAsset, SpriteFrame, CameraComponent } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("ScreenShots")
@menu('RenderTexture/ScreenShots')
export class ScreenShots extends Component {
    @property(SpriteComponent)
    sprite: SpriteComponent = null;
    @property(CameraComponent)
    camera: CameraComponent = null;

    start () {
        const spriteframe = this.sprite.spriteFrame;
        const rendetTex = new RenderTexture();
        rendetTex.reset({width: 256, height: 256, depthStencilFormat: RenderTexture.DepthStencilFormat.DEPTH_24_STENCIL_8});
        this.camera.targetTexture = rendetTex;
        this.scheduleOnce(() => {
            spriteframe.setGFXTextureView(rendetTex.getGFXTextureView());
        }, 1);
    }
}
