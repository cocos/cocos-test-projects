
import * as cc from 'cc';
import { UILog } from '../../../ui/ui-log';

@cc._decorator.ccclass('CoreJsTest')
@cc._decorator.menu('TestCases/Scripting/LanguageFeature/CoreJsTest')
export class CoreJsTest extends cc.Component {
    @cc._decorator.property(UILog)
    logPanel: UILog = null;

    public start() {

        this.logPanel.addLabel(`测试开始...
---------------------------------------\
`);
        this._runTests();

        this.logPanel.addLabel(`\
---------------------------------------
测试结束！\
`);
    }

    private _runTests() {
        const asserts = this._asserts.bind(this);

        asserts(shouldBeDefined(globalThis));
        // asserts(shouldBeDefined(globalThis.what));

        function shouldBeDefined(value: any): boolean {
            return typeof value !== 'undefined';
        }
    }

    private _asserts(expr: boolean) {
        if (!expr) {
            this.logPanel.addLabel(`✖ 测试失败！`);
        }
    }
}
