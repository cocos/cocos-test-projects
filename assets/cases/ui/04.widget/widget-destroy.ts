import { _decorator, Component, Node, Prefab, Vec3, LabelComponent, instantiate, director, widgetManager } from "cc";
const { ccclass, property } = _decorator;

@ccclass("WidgetDestroy")
export class WidgetDestroy extends Component {

    @property ({type:Prefab})
    defaultPre = null;

    @property ({type:LabelComponent})
    coinNumber: LabelComponent = null;

    @property ({type:LabelComponent})
    activeWidgetNum = null;

    movePos = new Vec3(-200, 0, 0);

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
        this.coinNumber.string = ('The Coin Num is:' + director.getScene().children[2].children[3].children.length);
        this.activeWidgetNum.string = 'The active Widget Num is:' + (widgetManager._activeWidgetsIterator.length - 5);
        // 此处的 5 为当前场景非create出的组件的widget数量
        // 提示中的 activeNode 和 iconNum 的差值为常驻节点的 widget 数量（目前也为5）
    }
}
