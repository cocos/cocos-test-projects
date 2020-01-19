import { _decorator, Component, Node, director, LabelComponent } from "cc";
const { ccclass, property } = _decorator;

@ccclass("subScript02")
export class subScript02 extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    @property({type: LabelComponent})
    tips = null;

    start () {
        // Your initialization goes here.
        console.log('subScript02 load finish');
        this.tips.string = "subScript02 load finish!";
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }

    backToList() {
        director.loadScene('sub-packages');
    }
}
