import { _decorator, Component, Node, RenderTexture, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UseRenderTextureToSprite')
export class UseRenderTextureToSprite extends Component {

    @property(RenderTexture)
    public render: RenderTexture = null!;

    start () {
        const renderTex = this.render;

        const spriteFrame = this.getComponent(Sprite)!.spriteFrame!;
        spriteFrame.texture = renderTex;
    }

}
