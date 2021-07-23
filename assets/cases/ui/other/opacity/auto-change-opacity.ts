
import { _decorator, Component, Node, instantiate, Renderable2D, UIOpacity, Color } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AutoChangeOpacity')
export class AutoChangeOpacity extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    private opacity = 0;
    private isColor = false;
    private disappear = true;
    private tempColor = new Color();

    @property({
        type: Renderable2D
    })
    public renderComp: Renderable2D = null!;

    @property({
        type: UIOpacity
    })
    public opacityComp: UIOpacity = null!;

    start () {
        this.disappear = true;
        // For test renderFlag is false when game start
        this.opacity = -1;
        if (this.renderComp) {
            this.isColor = true;
            this.tempColor = this.renderComp.color.clone();
        } else if (this.opacityComp) {
            this.isColor = false;
        }
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    update (deltaTime: number) {
        if (this.opacity <= 0) {
            this.disappear = false;
        } else if (this.opacity >= 255) {
            this.disappear = true;
        }
        if(this.disappear) {
            this.opacity -= 1;            
        }else {
            this.opacity += 1;
        }
        if (this.isColor) {
            this.tempColor.a = this.opacity;
            this.renderComp.color = this.tempColor;
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
