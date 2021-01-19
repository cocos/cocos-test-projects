import { _decorator, Component, Node, Sprite, SpriteFrame, Canvas, RenderTexture, view } from 'cc';
const { ccclass, property, menu } = _decorator;

@ccclass('RenderUIToSpriteFrame')
@menu('RenderTexture/RenderUIToSpriteFrame')
export class RenderUIToSpriteFrame extends Component {

    @property(Sprite)
    public content: Sprite = null!;

    protected _renderTex: RenderTexture | null = null;

    start () {
        const spriteFrame = this.content.spriteFrame!;
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
        const size = view.getVisibleSize();
        renderTex.reset({
            width: size.width,
            height: size.height,
        });

        const cameraComp = this.getComponent(Canvas)!;
        cameraComp.targetTexture = renderTex;

        sp.texture = renderTex;
        this.content.spriteFrame = sp;
    }

    onDestroy () {
        if (this._renderTex) {
            this._renderTex.destroy();
            this._renderTex = null;
        }
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
