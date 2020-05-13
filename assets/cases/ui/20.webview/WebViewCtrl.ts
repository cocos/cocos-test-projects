import { _decorator, Component, Node, LabelComponent, EditBoxComponent, WebviewComponent } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('WebViewCtrl')
export class WebViewCtrl extends Component {

    @property(LabelComponent)
    callbackLabel: LabelComponent = null;
    @property(EditBoxComponent)
    editBox: EditBoxComponent = null;
    @property(WebviewComponent)
    webview: WebviewComponent = null;

    onWebFinishLoad (webview, event) {
        let loadStatus = '';
        if(event === WebviewComponent.EventType.LOADED) {
            loadStatus = 'is Loaded!'
        } else if (event === WebviewComponent.EventType.LOADING) {
            loadStatus = 'is Loading!'
        } else if (event === WebviewComponent.EventType.ERROR) {
            loadStatus = 'is error!'
        }
        this.callbackLabel.string = this.webview.url + loadStatus;
    }

    visitURL () {
        this.webview.url = this.editBox.string;
    }
}
