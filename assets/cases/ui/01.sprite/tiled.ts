import { _decorator, Component, Node, Size, view } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("Tiled")
@menu('UI/Tiled')
export class Tiled extends Component {

    private _startSize = new Size();

    start () {
        this._startSize.set(this.node.getContentSize());
    }

    update(dt){
        const size = view.getVisibleSize() as Size;
        const limit = size.width * 0.7;
        let content = this.node.getContentSize();
        let width = content.width;
        if(width > limit){
            this.enabled = false;
        }

        this.node.setContentSize(width + 5, content.height);
    }
}
