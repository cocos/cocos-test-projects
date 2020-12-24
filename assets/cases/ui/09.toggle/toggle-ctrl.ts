import { _decorator, Component, Node, ToggleContainer, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ToggleCtrl')
export class ToggleCtrl extends Component {

    @property(ToggleContainer)
    public group: ToggleContainer = null!;

    start () {
        let node = this.group.node.getChildByName('Label')!;
        let label = node.getComponent(Label)!;
        label.string += `\n toggleItems length : ${this.group.toggleItems.length}`;
    }
}
