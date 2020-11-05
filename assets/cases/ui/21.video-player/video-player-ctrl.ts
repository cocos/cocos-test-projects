import { _decorator, Component, Node, Slider, VideoPlayer, VideoClip, Label, sys, director, macro } from 'cc';
const { ccclass, type } = _decorator;

@ccclass('VideoPlayerCtrl')
export class VideoPlayerCtrl extends Component {
    @type(VideoClip)
    videClip = null;
    @type(VideoPlayer)
    videoPlayer = null;
    @type(Label)
    eventType = null;
    @type(Label)
    playbackRate = null;
    @type(Label)
    stayOnBottom = null;
    @type(Slider)
    slider = null;
    @type(Node)
    stayOnBottomTips = null;
    @type(Node)
    noSupport = null;
    @type(Label)
    platform = null;

    _playbackRate = 1;

    start () {
        // 隐藏不支持 video player 的平台
        switch (sys.platform) {
            case sys.ANDROID:
            case sys.OS_IOS:
            case sys.MACOS:
            case sys.ALIPAY_MINI_GAME:
            case sys.BYTEDANCE_MINI_GAME:
            case sys.COCOSPLAY:
            case sys.HUAWEI_QUICK_GAME:
            case sys.OPPO_MINI_GAME:
            case sys.VIVO_MINI_GAME:
            case sys.XIAOMI_QUICK_GAME:
            case sys.BAIDU_MINI_GAME:
            case sys.LINKSURE:
            case sys.QTT_GAME:
            case sys.WIN32:
                this.noSupport.active = true;
                this.videoPlayer.node.active = false;
                break;
        }
        this.platform.string = `platform: ${sys.platform}`;
        this.eventType.string = 'nothing';
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
        this.videoPlayer.remoteURL = 'http://download.cocos.org/CocosTest/test-case/movie.mp4';
        this.videoPlayer.play();
    }

    onEventType (target, type) {
        this.eventType.string = type;
    }

    update () {
        this.slider.progress = this.videoPlayer.currentTime / this.videoPlayer.duration;
    }
}
