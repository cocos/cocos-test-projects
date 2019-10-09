import { _decorator, Component, Node, ScrollViewComponent, Vec2, Vec3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("backbutton")
export class backbutton extends Component {
    private static _offset = new Vec3();

    public static get offset() {
        return backbutton._offset;
    }

    public static set offset( value ) {
        backbutton._offset = value;
    }

    start () {
        cc.game.addPersistRootNode(this.node);
    }

    backToList () {
        cc.director.loadScene("TestList");
    }
}
