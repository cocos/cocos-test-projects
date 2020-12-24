import { _decorator, Component, Sprite, Slider, Color } from "cc";
const { ccclass, menu } = _decorator;

@ccclass("SliderCtrl")
@menu('UI/SliderCtrl')
export class SliderCtrl extends Component {

    _color = new Color();

    start () {
        // Your initialization goes here.
    }

    changeAlpha(slider: Slider){
        const spriteComp = this.getComponent(Sprite)!;
        this._color.set(spriteComp.color);
        this._color.a = slider.progress * 255;
        spriteComp.color = this._color;
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
