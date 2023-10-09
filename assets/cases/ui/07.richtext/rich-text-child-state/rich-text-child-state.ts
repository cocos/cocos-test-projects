import { _decorator, Component, EventTouch, Node, RichText } from 'cc';
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

    public onUpdateContent (event: EventTouch | null, content?: string) {
        this._richText.string = content || Math.random().toString();
    }

}