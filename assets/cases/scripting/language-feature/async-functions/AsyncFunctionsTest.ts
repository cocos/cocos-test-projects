
import * as cc from 'cc';
import { UILog } from '../../../ui/ui-log';

@cc._decorator.ccclass('AsyncFunctionsTest')
@cc._decorator.menu('TestCases/Scripting/LanguageFeature/AsyncFunctionsTest')
export class AsyncFunctionsTest extends cc.Component {
    @cc._decorator.property(UILog)
    logPanel: UILog = null;
    public start () {
        (async () => { // Directly running an async function should be OK.
            this.logPanel.addLabel(`Async function starts at ${new Date()}`);
            // cc.log(`Async function starts at ${new Date()}`);
            await sleep(2000);
            this.logPanel.addLabel(`Async function ends at ${new Date()}(Expected: 2 seconds past)`);
            // cc.log(`Async function ends at ${new Date()}(Expected: 2 seconds past)`);

            try {
                this.logPanel.addLabel(`Async function(which is throw-ful) starts at ${new Date()}`);
                await sleepThrow(1000);
            } catch (error) {
                this.logPanel.addLabel(`Async function(which is throw-ful) throws "${error}" at ${new Date()}(Expected: 1 seconds past)`);
            }
        })();
    }
}

async function sleep (duration: number) { // Define an async function should be OK.
    return await new Promise((resolve, reject) => { // `await` in async function should be OK.
        setTimeout(() => {
            resolve();
        }, duration);
    });
}

const sleepThrow = async (at: number) => { // Define an async lambda should be OK.
    return await new Promise((resolve, reject) => { // `await` in lambda should be OK.
        setTimeout(() => {
            reject(new Error(`Oops...`));
        }, at);
    });
}
