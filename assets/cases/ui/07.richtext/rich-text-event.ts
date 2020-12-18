import { _decorator, Component, Node, find, RichTextComponent, Label, Prefab, instantiate, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RichTextEvent')
export class RichTextEvent extends Component {

    @property(Prefab)
    public templateTips: Prefab = null!;

    @property(Vec3)
    public position = new Vec3();

    onClick (event: string, param: string) {
        let node = instantiate(this.templateTips);
        node.position = this.position;
        node.parent = find('Canvas');
        let label = node.getComponent(Label)!;
        label.string = 'Duang Duang';
    }
}
