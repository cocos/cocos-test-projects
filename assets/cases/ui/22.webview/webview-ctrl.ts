import { _decorator, Component, Label, WebView, TextAsset } from 'cc';
const { ccclass, property } = _decorator;

function getEventType(type: WebView.EventType) {
    switch (type) {
        case WebView.EventType.LOADING:
            return 'LOADING';
        case WebView.EventType.LOADED:
            return 'LOADED';
        case WebView.EventType.ERROR:
            return 'Error';
    }
}

@ccclass('WebviewCtrl')
export class WebviewCtrl extends Component {
    @property(WebView)
    webview = null;
    @property(Label)
    eventTips = null;

    onGoTo () {
        this.webview.url = 'https://www.baidu.com';
    }

    onEventTypes (target, eventType: WebView.EventType) {
        this.eventTips.string = '触发事件：' + getEventType(eventType);
    }
}
