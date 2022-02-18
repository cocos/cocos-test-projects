
import { _decorator, Component, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('compressWithGray')
export class compressWithGray extends Component {

    start () {
        let sprite = this.node.getComponent(Sprite)!;
        sprite.grayscale = false;
        sprite.grayscale = true;
    }
}
