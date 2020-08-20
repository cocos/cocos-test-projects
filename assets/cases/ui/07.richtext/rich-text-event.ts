import { _decorator, Component, Node, find, RichTextComponent, LabelComponent, Prefab, instantiate, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RichTextEvent')
export class RichTextEvent extends Component {

    @property(Prefab)
    templateTips = null;

    onClick (event: string, param: string) {
        let node = instantiate(this.templateTips);
        node.position = new Vec3(0, 0, 0);
        node.parent = find('Canvas');
        let label = node.addComponent(LabelComponent);
        label.string = 'Duang Duang Duang ';
    }
}
