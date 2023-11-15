import { _decorator, Component, Node, Prefab, instantiate, Widget, Sprite, Color, Texture2D, SpriteFrame, Label, UITransform, random } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("WidgetPreformance")
@menu('UI/WidgetPreformance')
export class WidgetPreformance extends Component {

    @property(Prefab)
    public performancePrefab: Prefab = null!;
    @property(SpriteFrame)
    public bgTex: SpriteFrame = null!;

    public nodeA: Node = null!;

    private curSize = 0;
    private unitSize = 20;
    private maxSize = 200;

    start() {
        let i = 0;
        this.nodeA = instantiate(this.performancePrefab);
        this.node.addChild(this.nodeA);
        const sprite = this.nodeA.getComponent(Sprite)!;
        sprite.spriteFrame = this.bgTex;
        const arr = [true, false];
        for (i = 0; i < 500; i++) {
            const child = instantiate(this.performancePrefab) as Node;
            child.name = `layer_${i + 1}`;
            this.nodeA.addChild(child);
            const childWidgetComp = child.getComponent(Widget)!;
            childWidgetComp.isAlignTop = true;
            let bol = arr[Math.floor(random() * arr.length)];
            childWidgetComp.isAlignLeft = bol;
            bol = arr[Math.floor(random() * arr.length)];
            childWidgetComp.isAlignBottom = true;
            childWidgetComp.isAlignRight = bol;
            childWidgetComp.top = 0;
            childWidgetComp.left = random() * 200;
            childWidgetComp.bottom = 0;
            childWidgetComp.right = random() * 150;
            const renderComp = child.getComponent(Sprite)!;
            renderComp.color = new Color(random() * 255, random() * 255, random() * 255, 255);
        }

        const uiTrans = this.nodeA.getComponent(UITransform)!;
        const size = uiTrans.contentSize;
        uiTrans.setContentSize(size.width, 0);
        this.schedule(this.adjustWidget, 0.5);
    }

    onDisable() {
        this.unschedule(this.adjustWidget);
    }

    adjustWidget() {
        const uiTrans = this.nodeA.getComponent(UITransform)!;
        const size = uiTrans.contentSize;
        this.curSize = (this.curSize + this.unitSize) % this.maxSize;
        uiTrans.setContentSize(size.width, this.curSize);
    }
}
