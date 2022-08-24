import { _decorator, Component, Label, assert } from 'cc';
import { NATIVE } from 'cc/env';
const { ccclass, property } = _decorator;

@ccclass('NetworkWebSocket')
export class NetworkWebSocket extends Component {

    @property({type: Label})
    public wsStatus: Label = null!;

    @property({type: Label})
    public ws: Label = null!;
    
    @property({type: Label})
    public wsServerStatus: Label = null!;

    @property({type: Label})
    public wsServer: Label = null!;


    private  _wsiSendBinary: WebSocket | null = null;
    private  _wsServer: WebSocketServer | null = null; // only for native usage
    
    start() {
        if (NATIVE && typeof WebSocketServer !== "undefined") {
            this.wsServerStatus.string  = 'waiting..';
            this.prepareWebSocketServer();
    
            this._wsiSendBinary = null;
            this.wsStatus.string = 'waiting..';
            this.prepareWebSocket();
        }
    }

    onDestroy () {
        if (NATIVE && typeof WebSocketServer !== "undefined") {
            let wsiSendBinary = this._wsiSendBinary;
            if (wsiSendBinary) {
                wsiSendBinary.onopen = null;
                wsiSendBinary.onmessage = null;
                wsiSendBinary.onerror = null;
                // wsiSendBinary.onclose = null;
                wsiSendBinary.close();
            }
            let wsServer = this._wsServer;
            if (wsServer) {
                // wsServer.onconnection = null;
                // wsServer.onclose = null;
                wsServer.close();
            }
        }

    }

    prepareWebSocket () {
        const self = this;
        const websocketLabel = this.ws;
        const respLabel = this.wsStatus;
        // let url = this.wssCacert.nativeUrl;
        // if (assetManager.cacheManager) {
        //     url = assetManager.cacheManager.getCache(url) || assetManager.cacheManager.getTemp(url) || url;
        // }
        // We should pass the cacert to libwebsockets used in native platform, otherwise the wss connection would be closed.
        // @ts-ignore
        // this._wsiSendBinary = new WebSocket('wss://echo.websocket.events', []);
        this._wsiSendBinary = new WebSocket('ws://localhost:8080', []);
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
            respLabel.string = 'client is closed!';
        };

        this.scheduleOnce(this.sendWebSocketBinary, 1);
    }

    sendWebSocketBinary () {
        let websocketLabel = this.wsStatus.node.getParent()!.getComponent(Label)!;
        if (!this._wsiSendBinary) { return; }
        if (this._wsiSendBinary.readyState === WebSocket.OPEN){
            websocketLabel.string = 'WebSocket: send binary';
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
            this.wsStatus.string = warningStr;
            this.scheduleOnce(()=> {
                this.sendWebSocketBinary();
            }, 1);
        }
    }

    prepareWebSocketServer() {
            const self = this;
            const wsServerLabel = this.wsServer;
            const respLabel = this.wsServerStatus;
            this._wsServer = new WebSocketServer();

            this._wsServer.listen(8080, (err) => {
                 if (!err)
                 console.log("server booted!");
            });

            this._wsServer.onconnection = function (conn) {
                wsServerLabel.string = 'WebSocketServer: onconnection'
                respLabel.string = 'server is connected!';
                conn.ondata = function (data) {
                    wsServerLabel.string = 'WebSocketServer: onmessage'
                    conn.send(data, (err) => {});

                    const binary = new Uint8Array(data);
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

                    console.log(data, " data send!");
                }
                conn.onclose = function () {
                    console.log("connection gone!");
                };
            };

            this._wsServer.onclose = function () {
                wsServerLabel.string = 'WebSocketServer: onclose'
                respLabel.string = 'server is closed!';
                self._wsServer = null;
                console.log("server is closed!");
            }

            setTimeout(() => {
                if (this._wsServer){
                    this._wsServer.close();
                }
            }, 5000);
    }
}

