import { _decorator, Component, Node, Slider, VideoPlayer, VideoClip, Label, sys, director, macro, Sprite } from 'cc';
const { ccclass, type } = _decorator;

@ccclass('VideoPlayerCtrl')
export class VideoPlayerCtrl extends Component {
    @type(VideoClip)
    public videClip: VideoClip = null!;
    @type(VideoPlayer)
    public videoPlayer: VideoPlayer = null!;
    @type(Label)
    public playbackRate: Label = null!;
    @type(Label)
    public stayOnBottom: Label = null!;
    @type(Slider)
    public slider: Slider = null!;
    @type(Node)
    public stayOnBottomTips: Node = null!;
    @type(Node)
    public noSupport: Node = null!;
    @type(Label)
    public platform: Label = null!;

    _playbackRate = 1;

    start () {
        // 隐藏不支持 video player 的平台
        switch (sys.platform) {
            case sys.MACOS:
            case sys.ALIPAY_MINI_GAME:
            case sys.BYTEDANCE_MINI_GAME:
            case sys.COCOSPLAY:
            case sys.HUAWEI_QUICK_GAME:
            case sys.VIVO_MINI_GAME:
            case sys.XIAOMI_QUICK_GAME:
            case sys.BAIDU_MINI_GAME:
            case sys.LINKSURE_MINI_GAME:
            case sys.QTT_MINI_GAME:
            case sys.WIN32:
                this.noSupport.active = true;
                this.videoPlayer.node.active = false;
                break;
        }
        this.platform.string = `platform: ${sys.platform}`;
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

    onSlider (slider: Slider) {
        this.videoPlayer.currentTime = slider.progress * this.videoPlayer.duration;
    }

    onPlayLocalVideo () {
        this.videoPlayer.resourceType = VideoPlayer.ResourceType.LOCAL;
        if (this.videoPlayer.clip !== this.videClip){
            this.videoPlayer.clip = this.videClip;
        }
        if (!this.videoPlayer.isPlaying) {
            this.videoPlayer.play();
        }
    }

    onPlayRemoteVideo () {
        this.videoPlayer.resourceType = VideoPlayer.ResourceType.REMOTE;
        const remoteURL = 'https://download.cocos.org/CocosTest/test-case/movie.mp4';
        if (this.videoPlayer.remoteURL !== remoteURL) {
            this.videoPlayer.remoteURL = remoteURL;
        }
        if (!this.videoPlayer.isPlaying) {  
            this.videoPlayer.play();
        }
    }

    onEventType (target: VideoPlayerCtrl, type: string) {
        switch (type) {
            case VideoPlayer.EventType.READY_TO_PLAY: {
                if (!this.videoPlayer.isPlaying) {  
                    this.videoPlayer.play();
                }
                break;
            }
        }
    }

    update () {
        this.slider.progress = this.videoPlayer.currentTime / this.videoPlayer.duration;
    }
}
