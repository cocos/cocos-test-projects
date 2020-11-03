import {_decorator, Component, Label, WebView, TextAsset, Node, sys} from 'cc';
const { ccclass, type } = _decorator;

@ccclass('WebviewCtrl')
export class WebviewCtrl extends Component {
    @type(WebView)
    webview = null;
    @type(Label)
    eventTips = null;
    @type(Node)
    noSupport = null;

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
            case sys.XIAOMI_GAME:
            case sys.XIAOMI_QUICK_GAME:
            case sys.BAIDU_MINI_GAME:
            case sys.WECHAT_GAME:
            case sys.LINKSURE:
            case sys.QTT_GAME:
            case sys.WIN32:
                this.noSupport.active = true;
                this.webview.node.active = false;
                break;
        }
    }

    onGoTo () {
        this.webview.url = 'https://www.baidu.com';
    }

    onEventTypes (target, eventType: WebView.EventType) {
        this.eventTips.string = '触发事件：' + eventType;
    }
}
