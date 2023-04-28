import { _decorator, Component, Label, Node } from 'cc';
// @ts-ignore
import { EDITOR } from 'cc/env';

const {
    ccclass,
    property,
    disallowMultiple,
    requireComponent,
    menu,
} = _decorator;

@ccclass('L10nComponent')
@requireComponent(Label)
@disallowMultiple()
@menu('hidden:LocalizationEditor/L10nComponent')
export default abstract class L10nComponent extends Component {
    protected constructor() {
        super();
    }

    @property({ readonly: true })
    get string() {
        return this.label?.string || '';
    }
    label?: Label | null = undefined;

    protected onLoad() {
        this.label = this.node.getComponent(Label);
    }

    protected start() {
        this.render();
    }

    public render() {}

    public preview(value: string) {
        if (this.label && EDITOR) {
            const originalString = this.label.string;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.label._string = value;
            this.label.updateRenderData(true);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            cce.Engine.repaintInEditMode();
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.label._string = originalString;
        }
    }
}
