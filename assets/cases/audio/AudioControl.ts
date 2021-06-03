
import { _decorator, Component, AudioClip, AudioSource, Slider, Label, Toggle } from 'cc';
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

    @property(Toggle)
    toggle1: Toggle = null!

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

    @property(Toggle)
    toggle2: Toggle = null!

    onLoad () {
        this.source1.loop = this.toggle1.isChecked;
        this.source2.loop = this.toggle2.isChecked;
        this.progressSlider1.node.on('slide', this.onSlide, this);
        this.progressSlider2.node.on('slide', this.onSlide, this);
        this.toggle1.node.on(Toggle.EventType.TOGGLE, this.onToggle, this);
        this.toggle2.node.on(Toggle.EventType.TOGGLE, this.onToggle, this);
        this.source1.node.on(AudioSource.EventType.STARTED, this.onStarted, this);
        this.source1.node.on(AudioSource.EventType.ENDED, this.onEnded, this);
        this.source2.node.on(AudioSource.EventType.STARTED, this.onStarted, this);
        this.source2.node.on(AudioSource.EventType.ENDED, this.onEnded, this);
    }

    onDestroy () {
        this.progressSlider1.node.off('slide', this.onSlide, this);
        this.progressSlider2.node.off('slide', this.onSlide, this);
        this.toggle1.node.off(Toggle.EventType.TOGGLE, this.onToggle, this);
        this.toggle2.node.off(Toggle.EventType.TOGGLE, this.onToggle, this);
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

    onSlide (slider: Slider) {
        let source = slider === this.progressSlider1 ? this.source1 : this.source2;
        let currentTime = slider.progress * source.duration;
        source.currentTime = currentTime;
    }

    onToggle (toggle: Toggle) {
        let source = toggle === this.toggle1 ? this.source1 : this.source2;
        source.loop = toggle.isChecked;
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