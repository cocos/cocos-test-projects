import { _decorator, Component, Node, Prefab, Vec3, LabelAtlas, LabelComponent, instantiate, director } from "cc";
const { ccclass, property } = _decorator;

@ccclass("widgetDestroy")
export class widgetDestroy extends Component {

    @property ({type:Prefab})
    defaultPre = null;

    @property ({type:LabelComponent})
    coinNumber: LabelComponent = null;

    @property ({type:LabelComponent})
    activeWidgetNum = null;

    movePos = new Vec3(-200, 0, 0);

    createprefab() {
        let item = instantiate(this.defaultPre);
        this.node.addChild(item);
        this.schedule(this.updateLabel,0.5);
    }

    destroyThenCreate() {
        if (this.node.children.length < 1) {return;}
        this.node.children[this.node.children.length - 1].destroy();
        this.createprefab();
    }

    moveRoot() {
        this.movePos.x += 20;
        this.node.setPosition(this.movePos);
    }

    updateLabel() {
        this.coinNumber.string = ('The Coin Num is:' + director._scene.children[2].children[3].children.length);
        this.activeWidgetNum.string = 'The active Widget Num is:' + (cc._widgetManager._activeWidgetsIterator.length - 4);
    }
}
