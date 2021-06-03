
import { _decorator, Component, Node, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioOperationQueue')
export class AudioOperationQueue extends Component {
    
    @property(AudioSource)
    source: AudioSource = null!;

    start () {
        // 测试播放队列
        this.source.stop();
        this.source.pause();
        this.source.play();
        this.source.currentTime = 3;
        this.source.stop();
        this.source.stop();
        this.source.pause();
        this.source.play();
        this.source.pause();
        this.source.play();
        this.source.currentTime = 1;
        this.source.play();
        this.source.play();
        this.source.stop();
        this.source.play();
    }
}