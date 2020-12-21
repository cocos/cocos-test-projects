// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { _decorator, Component, Node, UITransform } from 'cc';
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('LayoutChangeOrder')
@executeInEditMode
export class LayoutChangeOrder extends Component {
    @property
    changePriority = true;

    start () {
        const children = this.node.children;
        const uiTrans = children[2].getComponent(UITransform)!;
        if (this.changePriority) {
            uiTrans.priority = 1;
        } else {
            children[2].setSiblingIndex(1);
        }
    }

}
