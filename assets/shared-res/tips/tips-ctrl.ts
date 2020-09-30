import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TipsCtrl')
export class TipsCtrl extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    onFinish () {
        this.node.destroy();
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
