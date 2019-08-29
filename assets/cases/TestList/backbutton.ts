import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("backbutton")
export class backbutton extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    start () {
        // Your initialization goes here.
        cc.game.addPersistRootNode(this.node);
    }

    backToList () {
        cc.director.loadScene("TestList");
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
