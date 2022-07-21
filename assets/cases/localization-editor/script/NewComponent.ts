import { _decorator, Component, Node, Label } from 'cc';
import intl from 'db://localization-editor/core/l10n-manager';
import I18nComponent from 'db://localization-editor/components/l10n-component';
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('NewComponent1')
@executeInEditMode(true)
export class NewComponent1 extends I18nComponent {
    render() {
        if (this.label) {
            this.preview(intl.t('this_is_script'))
        }
    }
}

