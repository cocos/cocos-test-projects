import {_decorator, Component, Label, WebView, TextAsset, Node, sys} from 'cc';
const { ccclass, type } = _decorator;

@ccclass('WebviewCtrl')
export class WebviewCtrl extends Component {
    @type(WebView)
    public webview: WebView = null!;
    @type(Label)
    public eventTips: Label = null!;
    @type(Node)
    public noSupport: Node = null!;
    @type(Label)
    public platform: Label = null!;

    start () {
        // 隐藏不支持 video player 的平台
        switch (sys.platform) {
            case sys.Platform.MACOS:
            case sys.Platform.ALIPAY_MINI_GAME:
            case sys.Platform.BYTEDANCE_MINI_GAME:
            case sys.Platform.COCOSPLAY:
            case sys.Platform.HUAWEI_QUICK_GAME:
            case sys.Platform.OPPO_MINI_GAME:
            case sys.Platform.VIVO_MINI_GAME:
            case sys.Platform.MIGU_MINI_GAME:
            case sys.Platform.HONOR_MINI_GAME:
            case sys.Platform.XIAOMI_QUICK_GAME:
            case sys.Platform.BAIDU_MINI_GAME:
            case sys.Platform.WECHAT_GAME:
            case sys.Platform.LINKSURE_MINI_GAME:
            case sys.Platform.QTT_MINI_GAME:
            case sys.Platform.WIN32:
                this.noSupport.active = true;
                this.webview.node.active = false;
                break;
        }
        this.platform.string = `platform: ${sys.platform}`;
    }

    onGoTo () {
        this.webview.url = 'https://docs.cocos.com/creator/manual/zh/';
    }

    onEventTypes (target: WebView, eventType: typeof WebView.EventType) {
        this.eventTips.string = '触发事件：' + eventType;
    }
}
