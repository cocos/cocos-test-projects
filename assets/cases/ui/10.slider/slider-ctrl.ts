import { _decorator, Component, SpriteComponent, SliderComponent, Color } from "cc";
const { ccclass, menu } = _decorator;

@ccclass("SliderCtrl")
@menu('UI/SliderCtrl')
export class SliderCtrl extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    _color = new Color();

    start () {
        // Your initialization goes here.
    }

    changeAlpha(slider: SliderComponent){
        const spriteComp = this.getComponent(SpriteComponent);
        this._color.set(spriteComp.color);
        this._color.a = slider.progress * 255;
        spriteComp.color = this._color;
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
