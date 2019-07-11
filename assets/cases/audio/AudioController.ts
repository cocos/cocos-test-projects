import { _decorator, Component, AudioClip, AudioSourceComponent, LabelComponent } from "cc";
const { ccclass, property } = _decorator;

@ccclass("AudioController")
export class AudioController extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    @property({type: [AudioClip]})
    public clips: AudioClip[] = [];

    @property({type: AudioSourceComponent})
    public audioSource: AudioSourceComponent = null;

    @property({type: [LabelComponent]})
    public nameLabel: LabelComponent = null;

    start () {
        // Your initialization goes here.
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }

    onButtonClicked(event, index: number) {
        let clip: AudioClip = this.clips[index];
        this.nameLabel.string = clip.name;
        this.audioSource.playOneShot(clip);
    }
}
