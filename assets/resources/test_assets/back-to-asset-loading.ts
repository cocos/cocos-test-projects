// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BackToAssetLoading')
export class BackToAssetLoading extends Component {
    @property
    sceneToBack = '';

    start () {
        // Your initialization goes here.
    }

    onClick() {
        return new Promise<void>((resovle) => {
            director.loadScene(this.sceneToBack, () => {
                resovle();
            });
        });
    }
}
