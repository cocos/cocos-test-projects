
import { _decorator, Component } from "cc";
const { ccclass, property, menu } = _decorator;
import { UILog } from '../../../ui/ui-log';

@ccclass('AsyncFunctionsTest')
@menu('TestCases/Scripting/LanguageFeature/AsyncFunctionsTest')
export class AsyncFunctionsTest extends Component {
    @property(UILog)
    public logPanel: UILog = null!;

    public start () {
        (async () => { // Directly running an async function should be OK.
            this._getLogPanelChecked().addLabel(`Async function starts at ${new Date()}`);
            // cc.log(`Async function starts at ${new Date()}`);
            await sleep(2000);
            this._getLogPanelChecked().addLabel(`Async function ends at ${new Date()}(Expected: 2 seconds past)`);
            // cc.log(`Async function ends at ${new Date()}(Expected: 2 seconds past)`);

            try {
                this._getLogPanelChecked().addLabel(`Async function(which is throw-ful) starts at ${new Date()}`);
                await sleepThrow(1000);
            } catch (error) {
                this._getLogPanelChecked().addLabel(`Async function(which is throw-ful) throws "${error}" at ${new Date()}(Expected: 1 seconds past)`);
            }
        })();
    }

    private _getLogPanelChecked () {
        if (this.isValid) {
            return this.logPanel;
        } else {
            // This may happen if the scene has been destroyed.
            // For simplification, we return a mocking stuff...
            return {
                addLabel() {
                    // ...
                },
            };
        }
    }
}

async function sleep (duration: number) { // Define an async function should be OK.
    return await new Promise<void>((resolve, reject) => { // `await` in async function should be OK.
        setTimeout(() => {
            resolve();
        }, duration);
    });
}

const sleepThrow = async (at: number) => { // Define an async lambda should be OK.
    return await new Promise<void>((resolve, reject) => { // `await` in lambda should be OK.
        setTimeout(() => {
            reject(new Error(`Oops...`));
        }, at);
    });
}
