import { _decorator, Component, Label, sys, native, EventTouch } from 'cc';
const { ccclass, property } = _decorator;


enum Status {
    IDLE,
    WAITING_FOR_TIMEOUT,
    TIMEOUT_TRIGGERED,
}

@ccclass('BlockingDetection')
export class BlockingDetection extends Component {

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

    get blocking() {
        return native.monitor?.blocking || {};
    }

    externalCallback: null | { (): void } = null;

    start() {
        this.updateSupportedLabel();
        const blocking = this.blocking;
        this.oldCallback = blocking.callback;
        this.oldBlockingTimeout = blocking.timeout
        blocking.callback = this.onBlockingDetected.bind(this)
        blocking.timeout = 0; // disable by default
    }

    update(deltaTime: number) {
        if (this.status === Status.IDLE) {
            if (this.resultLabel) {
                if (!this.isBlockingDetectionEnabled()) {
                    this.resultLabel.string = "Disabled";
                } else {
                    const Max = (this.blocking.timeout + 16) *1.1;
                    const Min = (this.blocking.timeout + 16) *0.9;
                    const Success = this.timeUsed >= Min && this.timeUsed <= Max;
                    const SuccessLabel = Success ? "Success." : "Failed!";
                    this.resultLabel.string = `Timeout ${this.blocking.timeout} ms, execution ${this.timeUsed} ms. ${SuccessLabel}`
                }
            }
            return;
        }
        if (this.skipFrames > 0) {
            this.skipFrames--;
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
        const blocking = this.blocking;
        blocking.callback = this.oldCallback;
        blocking.timeout = this.oldBlockingTimeout;
    }


    onUpdateTimeout(ev: EventTouch, timeoutMS: string) {
        if (this.resultLabel) {
            this.resultLabel.string = `Update blockingTimeout to ${timeoutMS} ms`;
        }
        setTimeout(() => {
            console.log(`update timeout to ${timeoutMS}`);
            this.status = Status.WAITING_FOR_TIMEOUT;
            native.monitor.blocking.timeout = Number.parseInt(timeoutMS, 10);
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
        if(this.externalCallback) {
            this.externalCallback();
        }
    }


    private isBlockingDetectionEnabled() {
        const blocking = this.blocking;
        return this.isSupported() && (blocking.timeout !== undefined) && blocking.timeout > 0;
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
