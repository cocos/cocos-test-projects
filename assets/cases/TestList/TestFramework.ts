import { Client } from './Client';
import { isEmptyObject } from './Utils';

export enum StateCode {
    START = 'Start',
    ERROR = 'Error',
    END = 'End',
    SCENE_CHANGED = 'SceneChanged',
    SCENE_ERROR = 'SceneError',
    PERFORMANCE = 'Performance',
}

export enum ReceivedCode {
    FAILED = 'Failed',
    ERROR = 'Error',
    Pass = 'Pass',
    OK = 'Ok',
    CHANGE_SCENE = 'ChangeScene',
}

type TestCallback = (err: Error | null, message?: any) => void

type TestEvent = {

    id: number,
    state: StateCode,
    message: any,
    startTime: number,
    sceneName: string,
    retry: number,
    cb: TestCallback

}

export class TestFramework {

    public static get instance (): TestFramework {

        if (!TestFramework._instance) {

            TestFramework._instance = new TestFramework();

        }

        return TestFramework._instance;

    }

    public onmessage: ((receivedCode: ReceivedCode, message: any) => void) | null = null;

    private static _instance: TestFramework | null = null;

    private _timeout: number = 5000;

    private _maxRetryTime: number = 3;

    private _client: Client | null = null;

    private _eventQueue: Record<number, TestEvent> = {};
    
    private _msgId = 0;

    private _timeoutTimer: number = 0;


    connect (address: string = '127.0.0.1', port: number = 8080, timeout: number = 5000, maxRetryTime: number = 3, cb: TestCallback ) {

        this._maxRetryTime = maxRetryTime;

        this._timeout = timeout;

        this._client = new Client(address, port);

        var timer = setTimeout(() => {

            this._client!.close();

            cb(new Error('connect failed'));

        }, timeout);

        this._client.onopen = () => {

            this._client!.onopen = null;

            clearTimeout(timer);

            cb(null);

        }

        this._client.onmessage = (event) => {

            let { id, state, message } = JSON.parse(event.data);

            let testEvent = this._eventQueue[id];

            delete this._eventQueue[id];

            if (testEvent) {

                testEvent.cb((state !== ReceivedCode.OK && state !== ReceivedCode.Pass) ? new Error('Failed') : null, message);

            }

            this.onmessage && this.onmessage(state, message);

        }

        

    }

    startTest (message: any, cb: TestCallback) {

        this.postMessage(StateCode.START, '', message, cb);

    }

    postMessage (state: StateCode, sceneName: string = '', message: any, cb: TestCallback) {

        let msgId  = ++this._msgId;

        this._eventQueue[msgId] = { id: msgId, state, sceneName, message, cb, startTime: Date.now(), retry: 0};

        if (!this._timeoutTimer) {

            this._timeoutTimer = setInterval(() => {

                let now = Date.now();

                for (let id in this._eventQueue) {

                    let event = this._eventQueue[id];

                    if (now - event.startTime > this._timeout) {
                        
                        if (event.retry > this._maxRetryTime) {

                            delete this._eventQueue[id];

                            event.cb(new Error('connection disconected'));

                        }
                        else {

                            event.retry++;

                            event.startTime = Date.now();

                            this._client!.postMessage({ id: event.id, state: event.state, sceneName: event.sceneName, message: event.message, time: Date.now() });

                        }
                        
                    }
    
                }

                if (isEmptyObject(this._eventQueue)) {

                    clearInterval(this._timeoutTimer);

                    this._timeoutTimer = 0;

                }

            }, 200);

        }

        this._client!.postMessage({ id: msgId, state, sceneName, message, time: Date.now() });

    }

    endTest (message: any, cb: TestCallback) {

        this.postMessage(StateCode.END, '', message, cb);

    }

    disconnect () {
        this._client!.close();
    }



}