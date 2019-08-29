import { _decorator, Component, Node, SpriteAtlas, loader } from "cc";
const { ccclass, property } = _decorator;

@ccclass("test")
export class test extends Component {

    onLoad() {
        loader.loadRes("test assets/sheep", SpriteAtlas,function () {
            // ......
        });
    }

}
