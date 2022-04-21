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
            case sys.MACOS:
            case sys.ALIPAY_MINI_GAME:
            case sys.BYTEDANCE_MINI_GAME:
            case sys.COCOSPLAY:
            case sys.HUAWEI_QUICK_GAME:
            case sys.OPPO_MINI_GAME:
            case sys.VIVO_MINI_GAME:
            case sys.XIAOMI_QUICK_GAME:
            case sys.BAIDU_MINI_GAME:
            case sys.WECHAT_GAME:
            case sys.LINKSURE_MINI_GAME:
            case sys.QTT_MINI_GAME:
            case sys.WIN32:
                this.noSupport.active = true;
                this.webview.node.active = false;
                break;
        }
        this.platform.string = `platform: ${sys.platform}`;
    }

    onGoTo () {
        this.webview.url = 'http://docs.cocos.com/creator/manual/zh/';
    }

    onEventTypes (target: WebView, eventType: typeof WebView.EventType) {
        this.eventTips.string = '触发事件：' + eventType;
    }
}
