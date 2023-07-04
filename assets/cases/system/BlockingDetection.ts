import { _decorator, Component, Label, sys, native, EventTouch } from 'cc';
const { ccclass, property } = _decorator;


enum Status {
    IDLE,
    WAITING_FOR_TIMEOUT,
    TIMEOUT_TRIGGERED,
}

@ccclass('BlockingDectection')
export class BlockingDectection extends Component {

    @property({ type: Label })
    notSupportedLabel: Label | null = null;

    @property({ type: Label })
    resultLabel: Label | null = null;

    private _status: Status = Status.IDLE;
    set status(s: Status) {
        console.log(`update status to ${s}`);
        this._status = s;
    }
    get status() {
        return this._status;
    }

    private oldCallback: any;
    private oldBlockingTimeout = 0;
    private timeUsed: number = 0;
    private skipFrames = 0;

    start() {
        this.updateSupportedLabel();
        const bd = native.blockingDetection;
        this.oldCallback = bd.callback;
        this.oldBlockingTimeout = bd.timeout
        bd.callback = this.onBlockingDetected.bind(this)
        bd.timeout = 0; // disable by default
    }

    update(deltaTime: number) {
        if (this.status === Status.IDLE) {
            if (this.resultLabel) {
                if (!this.isBlockingDetectionEnabled()) {
                    this.resultLabel.string = "Disabled";
                } else {
                    this.resultLabel.string = `Timeout ${native.blockingDetection.timeout} ms, execution ${this.timeUsed} ms.`
                }
            }
            return;
        }
        if(this.skipFrames > 0) {
            this.skipFrames --;
            return;
        }
        let i = 0;
        let k = 0;
        const dstart = (new Date).getTime();
        while (this.status !== Status.TIMEOUT_TRIGGERED && this.isBlockingDetectionEnabled()) {
            i++;
            if (i > 1000000) {
                i = 0;
                k++;
            }
        }
        const dend = (new Date).getTime();
        this.timeUsed = dend - dstart;
        console.log(` -- loop count ${k}`);
        this.status = Status.IDLE;
    }

    protected onDestroy(): void {
        const bd = native.blockingDetection;
        bd.callback = this.oldCallback;
        bd.timeout = this.oldBlockingTimeout;
    }


    onUpdateTimeout(ev: EventTouch, timeoutMS: string) {
        if (this.resultLabel) {
            this.resultLabel.string = `Update blockingTimeout to ${timeoutMS} ms`;
        }
        setTimeout(() => {
            console.log(`update timeout to ${timeoutMS}`);
            this.status = Status.WAITING_FOR_TIMEOUT;
            native.blockingDetection.timeout = Number.parseInt(timeoutMS, 10);
            this.skipFrames = 1;
        }, 50);
    }


    private onBlockingDetected() {
        console.log(`blocking detected`);
        this.status = Status.TIMEOUT_TRIGGERED;
        const err = new Error("Blocking Dectected!");
        //@ts-expect-error
        if (Error.captureStackTrace) Error.captureStackTrace(err);
        console.error(err);
    }


    private isBlockingDetectionEnabled() {
        return this.isSupported() && (native.blockingDetection.timeout !== undefined) && native.blockingDetection.timeout > 0;
    }


    private isSupported() {
        return sys.platform === sys.Platform.WIN32 ||
            sys.platform === sys.Platform.ANDROID ||
            sys.platform === sys.Platform.IOS ||
            sys.platform === sys.Platform.MACOS;
    }

    private updateSupportedLabel() {
        if (this.notSupportedLabel) {
            this.notSupportedLabel.node.active = !this.isSupported();
        }
    }

}