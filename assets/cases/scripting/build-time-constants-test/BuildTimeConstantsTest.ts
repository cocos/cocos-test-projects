import * as buildTimeConstants from 'cc/env';
import { _decorator, Component, Node, Label } from 'cc';
const { ccclass, property, menu, executeInEditMode } = _decorator;

// import * as buildTimeConstants from 'build-time-constants';

const keys = (Object.keys(buildTimeConstants) as (keyof typeof buildTimeConstants)[]).sort();

@ccclass('BuildTimeConstantsTest')
@menu('TestCases/Scripting/BuildTimeConstantsTest')
@executeInEditMode
export class BuildTimeConstantsTest extends Component {
    @property(Node)
    public labelNode: Node = null!;

    public start() {
        const label = this.labelNode.getComponent(Label)!;
        const keyNameMaxLen = keys.reduce((len, key) => Math.max(len, key.length), 0);
        let resultString = '';
        keys.forEach((key) => {
            if (key === 'LINKSURE' || key === 'QTT') {
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
    }
}
