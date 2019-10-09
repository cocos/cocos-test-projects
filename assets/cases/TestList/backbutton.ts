import { _decorator, Component, Node, ScrollViewComponent, Vec3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("backbutton")
export class backbutton extends Component {
    private static _offset = new Vec3();
    public static _scrollNode : Node | null  = null;
    private static _scrollCom : ScrollViewComponent | null = null;

    public static get offset() {
        return backbutton._offset;
    }

    public static set offset( value ) {
        backbutton._offset = value;
    }

    public static saveOffset () {
        if ( backbutton._scrollNode ) {
            backbutton._offset = new Vec3(0, backbutton._scrollCom.getScrollOffset().y, 0);
        }
    }

    start () {
        cc.game.addPersistRootNode(this.node);
        backbutton._scrollNode = this.node.getParent().getChildByPath('Canvas/ScrollView') as Node;
        if (backbutton._scrollNode) {
            backbutton._scrollCom = backbutton._scrollNode.getComponent(ScrollViewComponent);
        }
    }

    backToList () {
        cc.director.loadScene("TestList");
        this.scheduleOnce(function(){
            backbutton._scrollNode = this.node.getParent().getChildByPath('Canvas/ScrollView');
            if (backbutton._scrollNode) {
                backbutton._scrollCom = backbutton._scrollNode.getComponent(ScrollViewComponent);
                backbutton._scrollCom.scrollToOffset(backbutton.offset,0.1,true);
            }
        },0.01);
    }
}
