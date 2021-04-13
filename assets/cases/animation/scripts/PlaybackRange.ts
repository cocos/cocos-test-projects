
import { _decorator, Component, Node, AnimationClip, AnimationState, Slider, Label } from 'cc';
import { LabeledSlider } from './LabeledSlider';
const { ccclass, property } = _decorator;

@ccclass('Mark')
class Mark {
    @property
    public frame: number = 0;

    @property
    public name: string = '';
}

@ccclass('PlaybackRange')
export class PlaybackRange extends Component {
    @property(AnimationClip)
    public clip!: AnimationClip;

    @property(Slider)
    public sliderMin!: Slider;

    @property(Slider)
    public sliderMax!: Slider;

    @property(LabeledSlider)
    public labeledSliderMin!: LabeledSlider;

    @property(LabeledSlider)
    public labeledSliderMax!: LabeledSlider;

    @property(Label)
    public totalFramesLabel!: Label;

    @property([Mark])
    public marks: Mark[] = [];

    get totalFrames () {
        return Math.floor(this.frameRate * this.clip.duration);
    }

    get frameRate () {
        return this.clip.sample || 30;
    }

    public setRange (min: number, max: number) {
        if (!this._state) {
            return;
        }
        const factor = 1.0 / this.frameRate;
        this._state.playbackRange = {
            min: factor * min,
            max: factor * max,
        };
    }

    public start () {
        this.totalFramesLabel.string = `${this.totalFrames}`;
        this.labeledSliderMin.max = this.totalFrames;
        this.labeledSliderMax.max = this.totalFrames;

        this._state = new AnimationState(this.clip);
        this._state.weight = 1.0;
        this._state.initialize(this.node);
        this._state.play();
    }

    public onSliderChanged () {
        const totalFrames = this.totalFrames;
        const minFrames = Math.floor(totalFrames * this.sliderMin.progress);
        const maxFrames = Math.floor(totalFrames * this.sliderMax.progress);
        if (maxFrames <= minFrames) {
            return;
        }
        this.setRange(minFrames, maxFrames);
        // this._state.wrapMode = AnimationClip.WrapMode.Normal;
        this._state.stop();
        this._state.play();
    }

    private declare _state: AnimationState;
}
