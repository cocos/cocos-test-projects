import { _decorator, Component, Node, Prefab, Vec3, Label, instantiate, director, widgetManager, find, Widget } from "cc";
const { ccclass, property } = _decorator;

@ccclass("WidgetDestroy")
export class WidgetDestroy extends Component {

    @property ({type:Prefab})
    public defaultPre: Prefab = null!;

    @property ({type:Label})
    public coinNumber: Label = null!;

    @property ({type:Label})
    public activeWidgetNum: Label = null!;

    movePos = new Vec3(-200, 0, 0);

    persistRootNodeWidgetCount = 0;

    start(): void {
        let persistRootNode = find("backRoot");
        if (persistRootNode) {
            let widgetArr = persistRootNode.getComponentsInChildren(Widget);
            for(let i = 0; i < widgetArr.length; i++) {
                if (widgetArr[i].enabled && widgetArr[i].node.active) {
                    this.persistRootNodeWidgetCount += 1;
                }
            }
        }
    }

    createPrefab() {
        let item = instantiate(this.defaultPre);
        this.node.addChild(item);
        this.schedule(this.updateLabel,0.5);
    }

    destroyThenCreate() {
        if (this.node.children.length < 1) {return;}
        this.node.children[this.node.children.length - 1].destroy();
        this.createPrefab();
    }

    moveRoot() {
        this.movePos.x += 20;
        this.node.setPosition(this.movePos);
    }

    updateLabel() {
        this.coinNumber.string = ('The Coin Num is:' + director.getScene()!.children[2].children[3].children.length);
        this.activeWidgetNum.string = 'The active Widget Num is:' + (widgetManager._activeWidgetsIterator.length - this.persistRootNodeWidgetCount);
        // 此处的 6 为当前场景非create出的组件的widget数量
        // 提示中的 activeNode 和 iconNum 的差值为常驻节点的激活的 widget 数量（目前为5）
    }
}
