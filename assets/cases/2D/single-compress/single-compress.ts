import { _decorator, Color, Component, Label, Node, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SingleCompress')
export class SingleCompress extends Component {

    @property({ type: [Node] })
    public sprites: Node[] = [];

    start() {
        this.sprites.forEach((spriteRoot) => {
            const sprite = spriteRoot.children[0];
            const texture = sprite.getComponent(Sprite).spriteFrame.texture;
            const name = sprite.name;
            const label = spriteRoot.children[1].getComponent(Label);
            if (texture.isCompressed) {
                // 纹理压缩
                label.color = new Color(255, 176, 36);
                // @ts-ignore
            } else if (texture._mipmaps[0]._native === `.${name}`) {
                // 格式和预期一致
                label.color = new Color(84, 103, 241);
            }
        })
    }

}

