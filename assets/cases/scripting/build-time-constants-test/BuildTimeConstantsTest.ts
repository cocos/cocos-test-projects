
import * as buildTimeConstants from 'cc/env';
import * as cc from 'cc';

// import * as buildTimeConstants from 'build-time-constants';

const keys = (Object.keys(buildTimeConstants) as (keyof typeof buildTimeConstants)[]).sort();

@cc._decorator.ccclass('BuildTimeConstantsTest')
@cc._decorator.menu('TestCases/Scripting/BuildTimeConstantsTest')
@cc._decorator.executeInEditMode
export class BuildTimeConstantsTest extends cc.Component {
    @cc._decorator.property(cc.Node)
    public labelNode: cc.Node = null;
    
    public start () {
        const labelComponent = this.labelNode.getComponent(cc.Label);
        const keyNameMaxLen = keys.reduce((len, key) => Math.max(len, key.length), 0);
        labelComponent.string = `\
${
    keys.map((key) => {
        const value = buildTimeConstants[key];
        const valueRep = typeof value === 'boolean' ?
            (value ? 'V' : 'X'):
            value;
        return `${key.padStart(keyNameMaxLen, ' ')} : ${valueRep}`;
    }).join('\n')
}
`;
    }
}
