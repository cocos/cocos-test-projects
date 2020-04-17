import { _decorator, Component, Node, SpriteComponent, ProgressBarComponent, CCObject , LabelComponent, Asset, assert, Socket } from "cc";
const { ccclass, property } = _decorator;

//imported from socket-io.js
declare var io:any;

@ccclass("NetworkCtrl")
export class NetworkCtrl extends Component {

    @property({type: LabelComponent})
    xhr: LabelComponent = null;
    
    @property({type: LabelComponent})
    xhrAB: LabelComponent = null;
    
    @property({type: LabelComponent})
    xhrTimeout: LabelComponent = null;

    @property({type: LabelComponent})
    websocket: LabelComponent = null;

    @property({type: LabelComponent})
    socketIO : LabelComponent = null;

    @property({type: cc.Asset})
    wssCacert: Asset = null;

    private  _reconnectCount = 0;

    private _xhrXHR : XMLHttpRequest = null;
    private _xhrHRAB: XMLHttpRequest = null;
    private _xhrXHRTimeout: XMLHttpRequest = null;
    private _wsiSendBinary: WebSocket = null;
    private _sioClient: any = null;

    private tag: string = "";

    // use this for initialization
    start () {
        this._wsiSendBinary = null;
        this._xhrXHR = null;
        this._xhrHRAB = null;
        this._xhrXHRTimeout = null;
        
        this.xhr.string = "waiting..";
        this.xhrAB.string = "waiting..";
        this.xhrTimeout.string = "waiting..";
        this.websocket.string = "waiting..";
        this.socketIO.string = "waiting..";
        
        this.sendXHR();
        this.sendXHRAB();
        this.sendXHRTimeout();
        this.prepareWebSocket();
        this.sendSocketIO();
    }

    onDestroy () {
        var wsiSendBinary = this._wsiSendBinary;
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
        var xhr = cc.loader.getXMLHttpRequest();
        this.streamXHREventsToLabel(xhr, this.xhr, 'GET');

        xhr.open("GET", "https://httpbin.org/get?show_env=1", true);
        if (cc.sys.isNative) {
            xhr.setRequestHeader("Accept-Encoding","gzip,deflate");
        }

        // note: In Internet Explorer, the timeout property may be set only after calling the open()
        // method and before calling the send() method.
        xhr.timeout = 10000;// 10 seconds for timeout

        xhr.send();
        this._xhrXHR = xhr;
    }

    sendXHRAB () {
        var xhr = cc.loader.getXMLHttpRequest();
        this.streamXHREventsToLabel(xhr, this.xhrAB, "POST");

        xhr.open("POST", "https://httpbin.org/post");
        //set Content-type "text/plain" to post ArrayBuffer or ArrayBufferView
        xhr.setRequestHeader("Content-Type","text/plain");
        // Uint8Array is an ArrayBufferView
        xhr.send(new Uint8Array([1,2,3,4,5]));
        this._xhrHRAB = xhr;
    }
    
    sendXHRTimeout () {
        var xhr = new XMLHttpRequest();
        this.streamXHREventsToLabel(xhr, this.xhrTimeout, 'GET');

        xhr.open("GET", "https://192.168.22.222", true);

        // note: In Internet Explorer, the timeout property may be set only after calling the open()
        // method and before calling the send() method.
        xhr.timeout = 5000;// 5 seconds for timeout
        xhr.send();
        this._xhrXHRTimeout = xhr;
    }
    
    prepareWebSocket () {
        var self = this;
        var websocketLabel = this.websocket.node.getParent().getComponent(LabelComponent);
        var respLabel = this.websocket;
        // We should pass the cacert to libwebsockets used in native platform, otherwise the wss connection would be closed.
        this._wsiSendBinary = new (WebSocket as any)("wss://echo.websocket.org", [], this.wssCacert.nativeUrl);
        this._wsiSendBinary.binaryType = "arraybuffer";
        this._wsiSendBinary.onopen = function(evt) {
            respLabel.string = "Opened!";
            websocketLabel.string = "WebSocket: onopen"
        };

        this._wsiSendBinary.onmessage = function(evt) {
            var binary = new Uint8Array(evt.data);
            var binaryStr = 'response bin msg: ';

            var str = '0x';
            let hexMap = '0123456789ABCDEF'.split("");
            assert(hexMap.length == 16);


            for (var i = 0; i < binary.length; i++) {
               str += hexMap[binary[i] >> 4];
               str += hexMap[binary[i] & 0x0F];
            }

            binaryStr += str;
            respLabel.string = binaryStr;
            websocketLabel.string = "WebSocket: onmessage"
        };

        this._wsiSendBinary.onerror = function(evt) {
           websocketLabel.string = "WebSocket: onerror"
            respLabel.string = "Error!";
        };

        this._wsiSendBinary.onclose = function(evt) {
            websocketLabel.string = "WebSocket: onclose"
            // After close, it's no longer possible to use it again, 
            // if you want to send another request, you need to create a new websocket instance
            self._wsiSendBinary = null;
            respLabel.string = "Close!";
        };
        
        this.scheduleOnce(this.sendWebSocketBinary, 1);
    }

    sendWebSocketBinary(sender) {
        var websocketLabel = this.websocket.node.getParent().getComponent(LabelComponent);
        if (!this._wsiSendBinary) { return; }
        if (this._wsiSendBinary.readyState === WebSocket.OPEN)
        {
            websocketLabel.string = "WebSocket: sendbinary";
            var buf = "Hello WebSocket中文,\0 I'm\0 a\0 binary\0 message\0.";
            
            var arrData = new Uint16Array(buf.length);
            for (var i = 0; i < buf.length; i++) {
                arrData[i] = buf.charCodeAt(i);
            }
            
            this._wsiSendBinary.send(arrData.buffer);
        }
        else
        {
            var warningStr = "send binary websocket instance wasn't ready...";
            websocketLabel.string = "WebSocket: not ready";
            this.websocket.string = warningStr;
            this.scheduleOnce(function () {
                this.sendWebSocketBinary();
            }, 1);
        }
    }

    // Socket IO callbacks for testing
    testevent(data) {
        if (!this.socketIO) { return; }

        var msg = this.tag + " says 'testevent' with data: " + data;
        this.socketIO.node.getParent().getComponent(LabelComponent).string = "SocketIO: testevent";
        this.socketIO.string = msg;
    }

    message(data) {
        if (!this.socketIO) { return; }

        var msg = this.tag + " received message: " + data;
        this.socketIO.node.getParent().getComponent(LabelComponent).string = "SocketIO: message";
        this.socketIO.string = msg;
    }

    disconnection() {
        if (!this.socketIO) { return; }

        var msg = this.tag + " disconnected!";
        this.socketIO.node.getParent().getComponent(LabelComponent).string = "SocketIO: disconnect";
        this.socketIO.string = msg;
    }
    
    reconnecting () {
        if (!this.socketIO) { return; }

        this._reconnectCount++;
        var msg = this.tag + " is reconnecting(" + this._reconnectCount + ")";
        this.socketIO.node.getParent().getComponent(LabelComponent).string = "SocketIO: reconnecting";
        this.socketIO.string = "Reconnecting...";
    }

    sendSocketIO () {
        var self = this;
        if (typeof io === 'undefined') {
            cc.error('You should import the socket.io.js as a plugin!');
            return;
        }
        //create a client by using this static method, url does not need to contain the protocol
        var sioclient = io.connect("ws://tools.itharbors.com:4000", {"force new connection" : true});
        this._sioClient = sioclient;

        //if you need to track multiple sockets it is best to store them with tags in your own array for now
        this.tag = sioclient.tag = "Test Client";
        
        //register event callbacks
        //this is an example of a handler declared inline
        sioclient.on("connect", function() {
            if (!self.socketIO) { return; }

            var msg = sioclient.tag + " Connected!";
            // self.socketIO.textKey = i18n.t("cases/05_scripting/11_network/NetworkCtrl.js.13") + msg;
            self.socketIO.string = msg;

            // Send message after connection
            self._sioClient.send("Hello Socket.IO!");
        });

        //example of a handler that is shared between multiple clients
        sioclient.on("message", this.message.bind(this));

        sioclient.on("echotest", function (data) {
            if (!self.socketIO) { return; }

            cc.log("echotest 'on' callback fired!");
            var msg = self.tag + " says 'echotest' with data: " + data;
            // self.socketIO.textKey = i18n.t("cases/05_scripting/11_network/NetworkCtrl.js.14") + msg;
            self.socketIO.string = msg;
        });

        sioclient.on("testevent", this.testevent.bind(this));

        sioclient.on("disconnect", this.disconnection.bind(this));

        sioclient.on("reconnecting", this.reconnecting.bind(this));
    }
    
    streamXHREventsToLabel ( xhr:XMLHttpRequest, label:LabelComponent, method:string, responseHandler?:(string)=>string ) {
        var handler = responseHandler || function (response) {
            return method + " Response (30 chars): " + response.substring(0, 30) + "...";
        };
        
        let eventLabel = label.node.getParent().getComponent(LabelComponent);
        var eventLabelOrigin = eventLabel.string;
        // Simple events
        ['loadstart', 'abort', 'error', 'load', 'loadend', 'timeout'].forEach(function (eventname) {
            xhr["on" + eventname] = function () {
                eventLabel.string = eventLabelOrigin + "\nEvent : " + eventname;
                if (eventname === 'timeout') {
                    label.string += '(timeout)';
                }
                else if (eventname === 'loadend') {
                    label.string += '...loadend!';
                }
            };
        });
    
        // Special event
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status >= 200) {
                label.string = handler(xhr.responseText);
            }
            else if (xhr.status === 404) {
                label.string = "404 page not found!"
            }
            else if (xhr.readyState === 3) {
                label.string = "Request dealing!";
            }
            else if (xhr.readyState === 2) {
                label.string = "Request received!";
            }
            else if (xhr.readyState === 1) {
                label.string = "Server connection established! Request hasn't been received";
            }
            else if (xhr.readyState === 0) {
                label.string = "Request hasn't been initiated!";
            }
        };
    }

    rmXhrEventListener (xhr) {
        if (!xhr) {
            return;
        }
        ['loadstart', 'abort', 'error', 'load', 'loadend', 'timeout'].forEach(function (eventname) {
            xhr["on" + eventname] = null;
        });
        xhr.onreadystatechange = null;
    }
}
