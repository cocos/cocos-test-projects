import { _decorator, Component, Node, RenderTexture, SpriteComponent } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UseRenderTextureToSprite')
export class UseRenderTextureToSprite extends Component {

    @property(RenderTexture)
    render: RenderTexture = null;

    start () {
        const renderTex = this.render;

        const spriteFrame = this.getComponent(SpriteComponent).spriteFrame;
        spriteFrame.texture = renderTex;
    }

}
