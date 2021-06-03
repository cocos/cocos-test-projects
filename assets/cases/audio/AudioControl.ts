
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

    @property(Label)
    eventLabel1: Label = null!;

    @property(AudioSource)
    source2: AudioSource = null!;

    @property(Label)
    currentTimeLabel2: Label = null!;

    @property(Label)
    durationLabel2: Label = null!;

    @property(Slider)
    progressSlider2: Slider = null!;

    @property(Label)
    eventLabel2: Label = null!;

    onLoad () {
        this.progressSlider1.node.on('slide', this.onSlide1, this);
        this.progressSlider2.node.on('slide', this.onSlide2, this);
        this.source1.node.on(AudioSource.EventType.STARTED, this.onStarted, this);
        this.source1.node.on(AudioSource.EventType.ENDED, this.onEnded, this);
        this.source2.node.on(AudioSource.EventType.STARTED, this.onStarted, this);
        this.source2.node.on(AudioSource.EventType.ENDED, this.onEnded, this);
    }

    onDestroy () {
        this.progressSlider1.node.off('slide', this.onSlide1, this);
        this.progressSlider2.node.off('slide', this.onSlide2, this);
        this.source1.node.off(AudioSource.EventType.STARTED, this.onStarted, this);
        this.source1.node.off(AudioSource.EventType.ENDED, this.onEnded, this);
        this.source2.node.off(AudioSource.EventType.STARTED, this.onStarted, this);
        this.source2.node.off(AudioSource.EventType.ENDED, this.onEnded, this);
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

    onStarted (audioSource: AudioSource) {
        let eventLabel = audioSource === this.source1 ? this.eventLabel1 : this.eventLabel2;
        this.showEventLabel(eventLabel, 'STARTED', 1);
    }

    onEnded (audioSource: AudioSource) {
        let eventLabel = audioSource === this.source1 ? this.eventLabel1 : this.eventLabel2;
        this.showEventLabel(eventLabel, 'ENDED', 1);
    }

    showEventLabel (eventLabel: Label, text: string, timeInSeconds: number) {
        eventLabel.string = text;
        eventLabel.node.active = true;
        this.scheduleOnce(() => {
            eventLabel.node.active = false;
        }, timeInSeconds);
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
