import { _decorator, Component, Node, Slider, VideoPlayer, VideoClip, Label } from 'cc';
const { ccclass, property } = _decorator;

function getStatus (type) {
    switch (type) {
        case VideoPlayer.EventType.PLAYING:
            return 'PLAYING';
        case VideoPlayer.EventType.PAUSED:
            return 'PAUSED';
        case VideoPlayer.EventType.STOPPED:
            return 'STOPPED';
        case VideoPlayer.EventType.COMPLETED:
            return 'COMPLETED';
        case VideoPlayer.EventType.META_LOADED:
            return 'META_LOADED';
        case VideoPlayer.EventType.CLICKED:
            return 'CLICKED';
        case VideoPlayer.EventType.READY_TO_PLAY:
            return 'READY_TO_PLAY';
        default:
            return 'NONE';
    }
}

@ccclass('VideoPlayerCtrl')
export class VideoPlayerCtrl extends Component {
    @property(VideoClip)
    videClip = null;
    @property(VideoPlayer)
    videoPlayer = null;
    @property(Label)
    eventType = null;
    @property(Label)
    playbackRate = null;
    @property(Label)
    stayOnBottom = null;
    @property(Slider)
    slider = null;
    @property(Node)
    stayOnBottomTips = null;

    _playbackRate = 1;

    start () {
        this.eventType.string = '';
    }

    onStayOnBottom () {
        this.videoPlayer.stayOnBottom = !this.videoPlayer.stayOnBottom;
        let state = this.videoPlayer.stayOnBottom ? '关闭' : '打开';
        this.stayOnBottom.string = `${state} stayOnBottom`;
        this.stayOnBottomTips.active = this.videoPlayer.stayOnBottom;
    }

    onPlaybackRate () {
        this._playbackRate = this._playbackRate++ >= 3 ? 1 : this._playbackRate;
        this.videoPlayer.playbackRate = this._playbackRate;
        this.playbackRate.string = `x${this._playbackRate}`;
    }

    onSlider (slider) {
        this.videoPlayer.currentTime = slider.progress * this.videoPlayer.duration;
    }

    onPlayLocalVideo () {
        this.videoPlayer.resourceType = VideoPlayer.ResourceType.LOCAL;
        this.videoPlayer.clip = this.videClip;
        this.videoPlayer.play();
    }

    onPlayRemoteVideo () {
        this.videoPlayer.resourceType = VideoPlayer.ResourceType.REMOTE;
        this.videoPlayer.remoteURL = 'https://www.w3school.com.cn/i/movie.mp4';
        this.videoPlayer.play();
    }

    onEventType (target, type) {
        this.eventType.string = getStatus(type);
    }

    update () {
        this.slider.progress = this.videoPlayer.currentTime / this.videoPlayer.duration;
    }
}
