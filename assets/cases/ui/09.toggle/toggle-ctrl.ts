import { _decorator, Component, Node, ToggleContainerComponent, LabelComponent } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ToggleCtrl')
export class ToggleCtrl extends Component {

    @property(ToggleContainerComponent)
    public group = null;

    start () {
        let node = this.group.node.getChildByName('Label');
        let label = node.getComponent(LabelComponent);
        label.string += `\n toggleItems length : ${this.group.toggleItems.length}`;
    }
}
