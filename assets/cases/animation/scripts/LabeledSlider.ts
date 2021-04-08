
import { _decorator, Component, Node, Slider, Label, EventHandler, js } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LabeledSlider')
export class LabeledSlider extends Component {
    @property
    public min: number = 0;

    @property
    public max: number = 1;

    @property
    public integral = false;

    public start () {
        const slider = this._slider =
            this.node.getChildByPath('Slider')!.getComponent(Slider)!;
        const valueLabel = this._valueLabel =
            this.node.getChildByPath('ValueLabel')!.getComponent(Label)!;
        const eventHandler = new EventHandler();
        eventHandler.target = this.node;
        eventHandler.component = js.getClassName(LabeledSlider);
        eventHandler.handler = '_onSliderChanged';
        slider.slideEvents.push(eventHandler);
        this._onSliderChanged();
    }

    private declare _slider: Slider;

    private declare _valueLabel: Label;

    private _onSliderChanged () {
        const val = this.min + (this.max - this.min) * this._slider.progress;
        this._valueLabel.string = `${this.integral ? Math.floor(val) : val}`;
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
