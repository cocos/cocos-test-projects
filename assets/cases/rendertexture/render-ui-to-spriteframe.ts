import { _decorator, Component, Node, SpriteComponent, SpriteFrame, CanvasComponent, RenderTexture } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("RenderUIToSpriteFrame")
@menu('RenderTexture/RenderUIToSpriteFrame')
export class RenderUIToSpriteFrame extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    @property(SpriteComponent)
    content: SpriteComponent = null;

    start () {
        const spriteframe = this.content.spriteFrame;
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

        const renderTex = new RenderTexture();
        const size = cc.view.getVisibleSize();
        renderTex.reset({
            width: size.width,
            height: size.height,
            colorFormat: RenderTexture.PixelFormat.RGBA8888,
            depthStencilFormat: RenderTexture.DepthStencilFormat.DEPTH_32_STENCIL_8
        });

        const cameraComp = this.getComponent(CanvasComponent);
        cameraComp.targetTexture = renderTex;

        sp.texture = renderTex;
        this.content.spriteFrame = sp;
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
