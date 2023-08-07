import { find } from 'cc';
// @ts-ignore
import { beforeClass, testCase, testClass, expect } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom} from '../common/utils';
import { NetworkCtrl } from '../../../cases/network/NetworkCtrl';

@testClass('Network', 'network')
export class Network {
    private caseScript!: NetworkCtrl;

    @beforeClass
    async initData() {
        this.caseScript = find('Canvas')?.getComponent(NetworkCtrl)!;
    }

    @testCase
    async start(){
        await screenshot_custom(2);
    }

    @testCase
    async network(){
        await screenshot_custom(660);

        expect(this.caseScript.xhr.string).to.not.equal('waiting..');
        expect(this.caseScript.xhrAB.string).to.not.equal('waiting..');
        expect(this.caseScript.xhrTimeout.string).to.not.equal('waiting..');
        expect(this.caseScript.websocket.string).to.not.equal('waiting..');
    }
}
