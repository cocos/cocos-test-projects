import * as buildTimeConstants from 'cc/env';
import { _decorator, Component, Node, Label, UITransform, view } from 'cc';
import { Vec3 } from 'cc';
const { ccclass, property, menu, executeInEditMode } = _decorator;

// import * as buildTimeConstants from 'build-time-constants';

const keys = (Object.keys(buildTimeConstants) as (keyof typeof buildTimeConstants)[]).sort();
const ccKeys = (Object.keys(globalThis).filter(key => key.startsWith('CC_'))).sort();


const RemovedList = ['LINKSURE', 'QTT', 'ALIPAY'];

@ccclass('BuildTimeConstantsTest')
@menu('TestCases/Scripting/BuildTimeConstantsTest')
@executeInEditMode
export class BuildTimeConstantsTest extends Component {
    @property(Node)
    public labelNode: Node = null!;

    @property(Node)
    public ccLabelNode: Node = null!;

    public onLoad() {
        const label = this.labelNode.getComponent(Label)!;
        const keyNameMaxLen = keys.reduce((len, key) => Math.max(len, key.length), 0);
        let resultString = '';
        keys.forEach((key) => {
            if (RemovedList.includes(key)) {
                return;
            }
            const value = buildTimeConstants[key];
            if (typeof value === 'boolean') {
                const valueRep = (value ? 'V' : 'X');
                resultString += `${key.padStart(keyNameMaxLen, ' ')} : ${valueRep}\n`;
            } else { // number type
                resultString += `${key.padStart(keyNameMaxLen, ' ')} : ${value}\n`;
            }
        });
        label.string = resultString;

        const ccLabel = this.ccLabelNode.getComponent(Label)!;
        const ccKeyNameMaxLen = ccKeys.reduce((len, key) => Math.max(len, key.length), 0);
        resultString = '';
        ccKeys.forEach((key) => {
            if (RemovedList.includes(key.substring(3))) {
                return;
            }
            // @ts-ignore
            const value = globalThis[key];
            const valueRep = (value ? 'V' : 'X');
            resultString += `${key.padStart(ccKeyNameMaxLen, ' ')} : ${valueRep}\n`;
        });
        ccLabel.string = resultString;
        this.scheduleOnce(() => {
            const visibleHeight = view.getVisibleSize().height;
            const labelHeight = this.labelNode.getComponent(UITransform)!.contentSize.height;
            const targetHeight = visibleHeight;
            if (labelHeight > targetHeight) {
                // fit height
                const scaleY = targetHeight / labelHeight;
                const vec3 = new Vec3(scaleY, scaleY, scaleY);
                this.labelNode.setScale(vec3);
                this.ccLabelNode.setScale(vec3);
            }
        }, 0);

    }
}
