import { _decorator, Component, Node, Toggle, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ToggleEvent')
export class ToggleEvent extends Component {

    @property(Label)
    public tips: Label = null!;

    onToggleClick (toggle: Toggle) {
        this.tips.string = `触发了 toggle 事件，当前 Toggle 状态为：${toggle.isChecked}`;
    }

    onToggleContainerClick (toggle: Toggle) {
        this.tips.string = `触发了 ToggleContainer 事件，点了${toggle.node.name}的 Toggle`;
    }
}
