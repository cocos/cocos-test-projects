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
        if (this.changePriority) {
            children[0].getComponent(UITransform).priority = 0;
            children[1].getComponent(UITransform).priority = 2;
            children[2].getComponent(UITransform).priority = 1;
            children[3].getComponent(UITransform).priority = 3;
            children[4].getComponent(UITransform).priority = 4;
            children[5].getComponent(UITransform).priority = 5;
        } else {
            children[2].setSiblingIndex(1);
        }
    }

}
