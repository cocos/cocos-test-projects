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

    _playbackRate = 0;

    start () {
        // 隐藏不支持 video player 的平台
        switch (sys.platform) {
            case sys.Platform.MACOS:
            case sys.Platform.ALIPAY_MINI_GAME:
            // case sys.Platform.BYTEDANCE_MINI_GAME:
            case sys.Platform.COCOSPLAY:
            case sys.Platform.HUAWEI_QUICK_GAME:
            case sys.Platform.VIVO_MINI_GAME:
            case sys.Platform.MIGU_MINI_GAME:
            case sys.Platform.HONOR_MINI_GAME:
            case sys.Platform.XIAOMI_QUICK_GAME:
            case sys.Platform.BAIDU_MINI_GAME:
            case sys.Platform.LINKSURE_MINI_GAME:
            case sys.Platform.QTT_MINI_GAME:
            case sys.Platform.WIN32:
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
        let playbackRates: number[] = [];
        if(sys.platform === sys.BYTEDANCE_MINI_GAME || sys.platform === sys.WECHAT_GAME) {
            // The rate at which the WeChat mini-game and douyin platform  is played is fixed at a few values。
            if(sys.platform === sys.WECHAT_GAME) {
                // https://developers.weixin.qq.com/miniprogram/dev/api/media/video/VideoContext.playbackRate.html
                playbackRates = [1.0, 1.25, 1.5, 0.5, 0.8];
            } else if(sys.platform === sys.BYTEDANCE_MINI_GAME) {
                // https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/media/video/video
                // Douyin mini-games do not yet support settings
                playbackRates = [1.0];
            }
        } else {
            playbackRates = [1.0, 2.0, 3.0];
        }
        this._playbackRate += 1;
        this._playbackRate = this._playbackRate % playbackRates.length;
        this.videoPlayer.playbackRate = playbackRates[this._playbackRate];
        this.playbackRate.string = `x${playbackRates[this._playbackRate]}`;
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
