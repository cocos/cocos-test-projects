import { _decorator, Component, Node, BufferAsset, Label } from 'cc';
const { ccclass, property } = _decorator;

const asciiCodes = new Uint8Array(
    Array.prototype.map.call(
        '0123456789abcdef',
        char => char.charCodeAt()
    ) as number[]
);

function arrayBufferToHexString (arrayBuffer: ArrayBuffer) : string {
    const buff = new Uint8Array(arrayBuffer);
    const charCodes = new Uint8Array(buff.length * 2);

    for (let i = 0; i < buff.length; ++i) {
        charCodes[i * 2] = asciiCodes[buff[i] >>> 4];
        charCodes[i * 2 + 1] = asciiCodes[buff[i] & 0xf];
    }

    return String.fromCharCode(...charCodes);
}
@ccclass('TestBufferAsset')
export class TestBufferAsset extends Component {
    @property(BufferAsset)
    public bufferAsset: BufferAsset | null = null;

    @property(Node)
    public promptNode: Node | null = null;

    start () {
        const labelComp = this.promptNode?.getComponent<Label>(Label);
        const buffer = this.bufferAsset?.buffer();
        if (buffer && buffer.byteLength > 0) {
            if (labelComp) {
                const hexStr = arrayBufferToHexString(buffer);
                console.log('TestBufferAsset scene, BufferAsset is: ' + hexStr);
                labelComp.string = '加载成功，内容为：' + hexStr;
            }
        }
        else {
            if (labelComp) {
                labelComp.string = '加载失败';
            }
        }
    }
}

