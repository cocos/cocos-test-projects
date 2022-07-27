import { l10n } from 'db://localization-editor/l10n';
import { _decorator, Component, Node, Label } from 'cc';
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('NewComponent1')
export class NewComponent1 extends Component {
    label?: Label | null = undefined;

    protected onLoad() {
        this.label = this.node.getComponent(Label);
    }


    onStart() {
        if (this.label) {
            this.label.string = l10n.t('this_is_script')
        }
    }
}

