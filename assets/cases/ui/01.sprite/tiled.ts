import { _decorator, Component, Node, Size, view, UITransform } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("Tiled")
@menu('UI/Tiled')
export class Tiled extends Component {

    private _startSize = new Size();

    start () {
        const uiTrans = this.getComponent(UITransform)!;
        this._startSize.set(uiTrans.contentSize);
    }

    update(dt: number){
        const size = view.getVisibleSize() as Size;
        const limit = size.width * 0.7;
        const uiTrans = this.getComponent(UITransform)!;
        let content = uiTrans.contentSize;
        let width = content.width;
        if(width > limit){
            this.enabled = false;
        }

        uiTrans.setContentSize(width + 5, content.height);
    }
}
