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
    @property(Node)
    children_0 : Node | null = null;
    @property(Node)
    children_1 : Node | null = null;
    @property(Node)
    children_2 : Node | null = null;
    @property(Node)
    children_3 : Node | null = null;
    @property(Node)
    children_4 : Node | null = null;
    @property(Node)
    children_5 : Node | null = null;



    start () {
        if (this.changePriority) {
           this.children_0.getComponent(UITransform).priority = 0;
           this.children_1.getComponent(UITransform).priority = 2;
           this.children_2.getComponent(UITransform).priority = 1;
           this.children_3.getComponent(UITransform).priority = 3;
           this.children_4.getComponent(UITransform).priority = 4;
           this.children_5.getComponent(UITransform).priority = 5;
        } else {
            this.children_2.setSiblingIndex(1);
        }
    }

}
