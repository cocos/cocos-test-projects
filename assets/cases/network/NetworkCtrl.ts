import { _decorator, Component, Label, Asset, assert, loader, sys, assetManager } from 'cc';
const { ccclass, property } = _decorator;

// imported from socket-io.js
declare var io:any;

@ccclass('NetworkCtrl')
export class NetworkCtrl extends Component {

    @property({type: Label})
    public xhr: Label = null!;

    @property({type: Label})
    public xhrAB: Label = null!;

    @property({type: Label})
    public xhrTimeout: Label = null!;

    @property({type: Label})
    public websocket: Label = null!;

    @property({type: Asset})
    public wssCacert: Asset = null!;

    private  _reconnectCount = 0;

    private _xhrXHR : XMLHttpRequest | null = null;
    private _xhrHRAB: XMLHttpRequest | null = null;
    private _xhrXHRTimeout: XMLHttpRequest | null = null;
    private  _wsiSendBinary: WebSocket | null = null;
    private _sioClient: any = null;

    private tag: string = '';

    // use this for initialization
    start () {
        this._wsiSendBinary = null;
        this._xhrXHR = null;
        this._xhrHRAB = null;
        this._xhrXHRTimeout = null;

        this.xhr.string = 'waiting..';
        this.xhrAB.string = 'waiting..';
        this.xhrTimeout.string = 'waiting..';
        this.websocket.string = 'waiting..';

        this.sendXHR();
        this.sendXHRAB();
        this.sendXHRTimeout();
        this.prepareWebSocket();
    }

    onDestroy () {
        let wsiSendBinary = this._wsiSendBinary;
        if (wsiSendBinary) {
            wsiSendBinary.onopen = null;
            wsiSendBinary.onmessage = null;
            wsiSendBinary.onerror = null;
            wsiSendBinary.onclose = null;
            wsiSendBinary.close();
        }
        this.rmXhrEventListener(this._xhrXHR);
        this.rmXhrEventListener(this._xhrHRAB);
        this.rmXhrEventListener(this._xhrXHRTimeout);
    }

    sendXHR () {
        let xhr = loader.getXMLHttpRequest();
        this.streamXHREventsToLabel(xhr, this.xhr, 'GET');

        xhr.open('GET', 'https://httpbin.org/get?show_env=1', true);
        if (sys.isNative) {
            xhr.setRequestHeader('Accept-Encoding','gzip,deflate');
        }

        // note: In Internet Explorer, the timeout property may be set only after calling the open()
        // method and before calling the send() method.
        xhr.timeout = 10000;// 10 seconds for timeout

        xhr.send();
        this._xhrXHR = xhr;
    }

    sendXHRAB () {
        let xhr = loader.getXMLHttpRequest();
        this.streamXHREventsToLabel(xhr, this.xhrAB, 'POST');

        xhr.open('POST', 'https://httpbin.org/post');
        // set Content-type "text/plain" to post ArrayBuffer or ArrayBufferView
        xhr.setRequestHeader('Content-Type','text/plain');
        // Uint8Array is an ArrayBufferView
        xhr.send(new Uint8Array([1,2,3,4,5]));
        this._xhrHRAB = xhr;
    }

    sendXHRTimeout () {
        let xhr = new XMLHttpRequest();
        this.streamXHREventsToLabel(xhr, this.xhrTimeout, 'GET');

        xhr.open('GET', 'https://192.168.22.222', true);

        // note: In Internet Explorer, the timeout property may be set only after calling the open()
        // method and before calling the send() method.
        xhr.timeout = 5000;// 5 seconds for timeout
        xhr.send();
        this._xhrXHRTimeout = xhr;
    }

    prepareWebSocket () {
        const self = this;
        const websocketLabel = this.websocket.node.getParent()!.getComponent(Label)!;
        const respLabel = this.websocket;
        // We should pass the cacert to libwebsockets used in native platform, otherwise the wss connection would be closed.
        let url = this.wssCacert.nativeUrl;
        if (assetManager.cacheManager) {
            url = assetManager.cacheManager.getCache(url) || assetManager.cacheManager.getTemp(url) || url;
        }
        this._wsiSendBinary = new WebSocket('wss://echo.websocket.org', []);
        this._wsiSendBinary.binaryType = 'arraybuffer';
        this._wsiSendBinary.onopen = function (evt) {
            respLabel.string = 'Opened!';
            websocketLabel.string = 'WebSocket: onopen'
        };

        this._wsiSendBinary.onmessage = function (evt) {
            const binary = new Uint8Array(evt.data);
            let binaryStr = 'response bin msg: ';

            let str = '0x';
            const hexMap = '0123456789ABCDEF'.split('');
            assert(hexMap.length == 16);


            for (let i = 0; i < binary.length; i++) {
               str += hexMap[binary[i] >> 4];
               str += hexMap[binary[i] & 0x0F];
            }

            binaryStr += str;
            respLabel.string = binaryStr;
            websocketLabel.string = 'WebSocket: onmessage'
        };

        this._wsiSendBinary.onerror = function (evt) {
           websocketLabel.string = 'WebSocket: onerror'
            respLabel.string = 'Error!';
        };

        this._wsiSendBinary.onclose = function (evt) {
            websocketLabel.string = 'WebSocket: onclose'
            // After close, it's no longer possible to use it again,
            // if you want to send another request, you need to create a new websocket instance
            self._wsiSendBinary = null;
            respLabel.string = 'Close!';
        };

        this.scheduleOnce(this.sendWebSocketBinary, 1);
    }

    sendWebSocketBinary () {
        let websocketLabel = this.websocket.node.getParent()!.getComponent(Label)!;
        if (!this._wsiSendBinary) { return; }
        if (this._wsiSendBinary.readyState === WebSocket.OPEN){
            websocketLabel.string = 'WebSocket: sendbinary';
            let buf = 'Hello WebSocket中文,\0 I\'m\0 a\0 binary\0 message\0.';

            let arrData = new Uint16Array(buf.length);
            for (let i = 0; i < buf.length; i++) {
                arrData[i] = buf.charCodeAt(i);
            }

            this._wsiSendBinary.send(arrData.buffer);
        }
        else{
            let warningStr = 'send binary websocket instance wasn\'t ready...';
            websocketLabel.string = 'WebSocket: not ready';
            this.websocket.string = warningStr;
            this.scheduleOnce(()=> {
                this.sendWebSocketBinary();
            }, 1);
        }
    }

    streamXHREventsToLabel (xhr: XMLHttpRequest, label: Label, method: string, responseHandler?: (str: string) => string) {
        let handler = responseHandler || function (response) {
            return method + ' Response (30 chars): ' + response.substring(0, 30) + '...';
        };

        const eventLabel = label.node.getParent()!.getComponent(Label)!;
        let eventLabelOrigin = eventLabel.string;
        // Simple events
        ['loadstart', 'abort', 'error', 'load', 'loadend', 'timeout'].forEach(function (eventName) {
            xhr[('on' + eventName) as 'onloadstart' | 'onabort' | 'onerror' | 'onload' | 'onloadend' | 'ontimeout'] = function () {
                eventLabel.string = eventLabelOrigin + '\nEvent : ' + eventName;
                if (eventName === 'timeout') {
                    label.string += '(timeout)';
                }
                else if (eventName === 'loadend') {
                    label.string += '...loadend!';
                }
            };
        });

        // Special event
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status >= 200) {
                label.string = handler(xhr.responseText);
            } else if (xhr.status === 404) {
                label.string = '404 page not found!'
            } else if (xhr.readyState === 3) {
                label.string = 'Request dealing!';
            } else if (xhr.readyState === 2) {
                label.string = 'Request received!';
            } else if (xhr.readyState === 1) {
                label.string = 'Server connection established! Request hasn\'t been received';
            } else if (xhr.readyState === 0) {
                label.string = 'Request hasn\'t been initiated!';
            }
        };
    }

    rmXhrEventListener (xhr: any) {
        if (!xhr) {
            return;
        }

        ['loadstart', 'abort', 'error', 'load', 'loadend', 'timeout'].forEach((eventName) => {
            xhr['on' + eventName] = null;
        });
        xhr.onreadystatechange = null;
    }
}
