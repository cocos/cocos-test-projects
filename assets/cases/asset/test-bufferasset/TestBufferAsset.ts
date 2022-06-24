import { _decorator, Component, Node, BufferAsset, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TestBufferAsset')
export class TestBufferAsset extends Component {
    @property(BufferAsset)
    public bufferAsset: BufferAsset | null = null;

    @property(Node)
    public promptNode: Node | null = null;

    buf2hex (buffer: ArrayBuffer) : string {
        return [...new Uint8Array(buffer)]
            .map(x => x.toString(16).padStart(2, '0'))
            .join('');
    }

    start () {
        const labelComp = this.promptNode?.getComponent<Label>(Label);
        const buffer = this.bufferAsset?.buffer();
        if (buffer && buffer.byteLength > 0) {
            if (labelComp) {
                const hexStr = this.buf2hex(buffer);
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

