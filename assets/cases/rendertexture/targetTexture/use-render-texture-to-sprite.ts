import { _decorator, Component, SpriteFrame, Node, RenderTexture, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UseRenderTextureToSprite')
export class UseRenderTextureToSprite extends Component {

    @property(RenderTexture)
    public render: RenderTexture = null!;

    start () {
        const renderTex = this.render;

        const spriteFrame = new SpriteFrame();
        spriteFrame.texture = renderTex;
        const sprite = this.getComponent(Sprite);
        sprite!.spriteFrame! = spriteFrame;
        // 引擎内部结构调整，需要手动调用材质更新，下个测试包代码会从Sprite内部调整
        sprite.updateMaterial();
    }

}
