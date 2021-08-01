import { WECHAT } from "cc/env";

export class Client {

    private _socket: WebSocket | null = null;

    private _connected: boolean = false;

    private _timer: number = 0;

    private _maxRetryTime: number = 3;

    public get connected (): Boolean {

        return this._connected;

    }

    constructor (address: string = '127.0.0.1', port: number = 8080) {
        let retryTime = 0;
        const init = () => {

            if (WECHAT) {
                this._socket = new WebSocket('wss://' + address);
            }
            else {
                this._socket = new WebSocket('ws://' + address + ':' + port);
            }
            
            this._socket.onmessage = (event) => {
                this.onmessage && this.onmessage(event);
            };

            this._socket.onopen = () => {
                this._connected = true;
                this.onopen && this.onopen();
            };

            this._socket.onerror = () => {
                this._connected = false;
                retryTime++;
                if (retryTime <= this._maxRetryTime) {
                    this._timer = setTimeout(init, 1000);
                }
            };

            this._socket.onclose = () => {
                this._connected = false;
                this.onclose && this.onclose();
            };

        }

        init();
    }

    postMessage (message: any ) {

        if (this._connected) {

            if (typeof message !== 'string' && !(message instanceof ArrayBuffer) && !ArrayBuffer.isView(message)) {
               
                message = JSON.stringify(message);

            }

            this._socket!.send(message);

            return true;

        }
    }

    close () {

        this._socket!.close();

        if (this._timer) {

            clearTimeout(this._timer);

        }

    }

    onopen: (() => void) | null = null;

    onmessage: ((message: MessageEvent) =>  void) | null = null;

    onclose: (() => void) | null = null; 

}
