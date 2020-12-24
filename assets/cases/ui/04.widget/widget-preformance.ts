import { _decorator, Component, Node, Prefab, instantiate, Widget, Sprite, Color, Texture2D, SpriteFrame, Label, UITransform } from "cc";
const { ccclass, property , menu} = _decorator;

@ccclass("WidgetPreformance")
@menu('UI/WidgetPreformance')
export class WidgetPreformance extends Component {

    @property(Prefab)
    public performancePrefab: Prefab = null!;
    @property(SpriteFrame)
    public bgTex: SpriteFrame = null!;

    public nodeA: Node = null!;

    start () {
        let i = 0;
        this.nodeA = instantiate(this.performancePrefab);
        this.node.addChild(this.nodeA);
        const uiTrans = this.node.getComponent(UITransform)!;
        uiTrans.setContentSize(400, 500);
        const sprite = this.nodeA.getComponent(Sprite)!;
        sprite.spriteFrame = this.bgTex;
        const arr = [true, false];
        for (i = 0; i < 500; i++) {
            const child = instantiate(this.performancePrefab) as Node;
            child.name = `layer_${i + 1}`;
            this.nodeA.addChild(child);
            const childWidgetComp = child.getComponent(Widget)!;
            childWidgetComp.isAlignTop = true;
            let bol = arr[Math.floor(Math.random() * arr.length)];
            childWidgetComp.isAlignLeft = bol;
            bol = arr[Math.floor(Math.random() * arr.length)];
            childWidgetComp.isAlignBottom = true;
            childWidgetComp.isAlignRight = bol;
            childWidgetComp.top = 0;
            childWidgetComp.left = Math.random()*200;
            childWidgetComp.bottom = 0;
            childWidgetComp.right = Math.random() * 150;
            const renderComp = child.getComponent(Sprite)!;
            renderComp.color = new Color(Math.random() * 255, Math.random() * 255, Math.random() * 255, 255);
        }

        this.schedule(this.adjustWidget,0.5);
    }

    onDisable () {
        this.unschedule(this.adjustWidget);
    }

    adjustWidget () {
        const uiTrans = this.nodeA.getComponent(UITransform)!;
        const size = uiTrans.contentSize;
        uiTrans.setContentSize(size.width, Math.random() * 200);
    }
}
