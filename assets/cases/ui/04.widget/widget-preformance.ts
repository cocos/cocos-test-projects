import { _decorator, Component, Node, Prefab, instantiate, WidgetComponent, SpriteComponent, Color, Texture2D, SpriteFrame, LabelComponent } from "cc";
const { ccclass, property , menu} = _decorator;

@ccclass("WidgetPreformance")
@menu('UI/WidgetPreformance')
export class WidgetPreformance extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    @property(Prefab)
    performancePrefab: Prefab = null;
    @property(SpriteFrame)
    bgTex: SpriteFrame = null;

    start () {
        let i = 0;
        const nodeA = instantiate(this.performancePrefab) as Node;
        this.node.addChild(nodeA);
        nodeA.setContentSize(400, 500);
        const sprite = nodeA.getComponent(SpriteComponent);
        sprite.spriteFrame = this.bgTex;
        const arr = [true, false];
        for (i = 0; i < 500; i++) {
            const child = instantiate(this.performancePrefab) as Node;
            child.name = `layer_${i + 1}`;
            nodeA.addChild(child);
            const childWidgetComp = child.getComponent(WidgetComponent);
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
            const renderComp = child.getComponent(SpriteComponent);
            renderComp.color = new Color(Math.random() * 255, Math.random() * 255, Math.random() * 255, 255);
        }

        setTimeout(this.adjustWidget.bind(this), 500, nodeA);
    }

    adjustWidget(node: Node){
        const size = node.getContentSize();
        node.setContentSize(size.width, Math.random() * 200);
        setTimeout(this.adjustWidget.bind(this), 500, node);
    }
}
