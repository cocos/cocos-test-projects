import { _decorator, Component, Node, SpriteFrame, SpriteComponent, LabelComponent, UIStaticBatchComponent } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("StaticUI")
@menu('UI/StaticUI')
export class StaticUI extends Component {
    @property({
        type: [SpriteFrame]
    })
    spriteList: SpriteFrame[] = [];
    @property(LabelComponent)
    tipLabel: LabelComponent = null;

    private _idx = 0;

    start () {
        const content = this.node.getContentSize();
        let x = -content.width / 2;
        let y = content.height / 2;
        let len = this.spriteList.length;
        for (let i = 0; i < 500; i++) {
            const node = new Node(i.toString());
            node.parent = this.node as Node;
            node.setPosition(x, y, 0);
            const sprite = node.addComponent(SpriteComponent);
            sprite.type = SpriteComponent.Type.SLICED;
            sprite.sizeMode = SpriteComponent.SizeMode.CUSTOM;
            const sp = this.spriteList[i % len];
            sprite.spriteFrame = sp;

            if (x > content.width / 2) {
                x = -content.width / 2;
                y -= 110;
            }
            x += 5;
        }

        this.func();
    }

    func() {
        setTimeout(()=>{
            this._idx++;
            const comp = this.getComponent(UIStaticBatchComponent);
            const pos = Math.random() * 100;
            const lpos = this.node.position;
            this.node.setPosition(pos, lpos.y, lpos.z);
            comp.collect = true;
            if (this.tipLabel) {
                this.tipLabel.string = `第 ${this._idx} 次开始采集数据`;
            }

            this.func();
        }, 1000);
    }
}
