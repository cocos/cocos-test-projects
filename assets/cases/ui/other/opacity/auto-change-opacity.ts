
import { _decorator, Component, Node, instantiate, Renderable2D, UIOpacity } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AutoChangeOpacity')
export class AutoChangeOpacity extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    private opacity = 255;
    private isColor = false;

    @property({
        type: Renderable2D
    })
    public renderComp: Renderable2D = null!;

    @property({
        type: UIOpacity
    })
    public opacityComp: UIOpacity = null!;

    start () {
        // [3]
        this.opacity = 255;
        if (this.renderComp) {
            this.isColor = true;
        } else if (this.opacityComp){
            this.isColor = false;
        }
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    update (deltaTime: number) {
        if (this.opacity <= 0) {
            this.opacity = 255;
        } else {
            this.opacity -= 2;
        }
        if (this.isColor) {
            this.renderComp.color.a = this.opacity;
        } else {
            this.opacityComp.opacity = this.opacity;
        }
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
