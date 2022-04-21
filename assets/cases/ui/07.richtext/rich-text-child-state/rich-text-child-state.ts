import { _decorator, Component, Node, RichText } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RichTextChildState')
export class RichTextChildState extends Component {
    private _richText:RichText  =null!;

    start() {
        this._richText = this.node.getChildByName('RichText')?.getComponent<RichText>(RichText)!;
    }

    update(deltaTime: number) {}

    public onSetActive () {
        this._richText.node.active = true;
    }

    public onSetInactive () {
        this._richText.node.active = false;
    }

    public onUpdateContent () {
        this._richText.string = Math.random().toString();
    }

}