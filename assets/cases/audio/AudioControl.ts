
import { _decorator, Component, AudioClip, AudioSource, Slider, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioControl')
export class AudioControl extends Component {

    @property(AudioClip)
    clip: AudioClip = null!;

    @property(AudioSource)
    source1: AudioSource = null!;

    @property(Label)
    currentTimeLabel1: Label = null!;

    @property(Label)
    durationLabel1: Label = null!;

    @property(Slider)
    progressSlider1: Slider = null!;

    @property(AudioSource)
    source2: AudioSource = null!;

    @property(Label)
    currentTimeLabel2: Label = null!;

    @property(Label)
    durationLabel2: Label = null!;

    @property(Slider)
    progressSlider2: Slider = null!;

    onLoad () {
        this.progressSlider1.node.on('slide', this.onSlide1, this);
        this.progressSlider2.node.on('slide', this.onSlide2, this);
    }

    onDestroy () {
        this.progressSlider1.node.off('slide', this.onSlide1, this);
    }
    
    playOneShot () {
        this.source1.playOneShot(this.clip);
    }

    update (dt: number) {
        this.updateSlider(this.source1, this.progressSlider1, this.currentTimeLabel1, this.durationLabel1);
        this.updateSlider(this.source2, this.progressSlider2, this.currentTimeLabel2, this.durationLabel2);
    }

    updateSlider (source: AudioSource, slider: Slider, currentTimeLabel: Label, durationLabel: Label) {
        let currentTime = Number.parseFloat(source.currentTime.toFixed(2));
        let duration = Number.parseFloat(source.duration.toFixed(2));
        currentTimeLabel.string = currentTime.toString();
        durationLabel.string = duration.toString();
        slider.progress = currentTime / duration;
    }

    onSlide1 (slider: Slider) {
        let currentTime = slider.progress * this.source1.duration;
        this.source1.currentTime = currentTime;
    }

    onSlide2 (slider: Slider) {
        let currentTime = slider.progress * this.source2.duration;
        this.source2.currentTime = currentTime;
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
