import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TipsCtrl')
export class TipsCtrl extends Component {

    onFinish () {
        this.node.destroy();
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
