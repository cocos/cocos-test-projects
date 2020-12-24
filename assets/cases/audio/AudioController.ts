import { _decorator, Component, AudioClip, AudioSource, Label, Slider } from "cc";
const { ccclass, property } = _decorator;

@ccclass("AudioController")
export class AudioController extends Component {

    @property({type: [AudioClip]})
    public clips: AudioClip[] = [];

    @property({type: AudioSource})
    public audioSource: AudioSource = null!;

    @property({type: Label})
    public nameLabel: Label = null!;

    start () {
        // Your initialization goes here.
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }

    onButtonClicked(event: any, index: number) {
        let clip: AudioClip = this.clips[index];
        this.nameLabel.string = clip.name;
        this.audioSource.playOneShot(clip);
    }

    onVolumeSliderChanged(eventTarget: Slider) {
        this.audioSource.volume = eventTarget.progress;
    }
}
