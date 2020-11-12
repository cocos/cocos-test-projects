// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { _decorator, Component,  sp } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SpineSkin')
export class SpineSkin extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    @property({type:sp.Skeleton})
    spine: sp.Skeleton|null = null;

    skinId: number = 0;

    start () {
        // Your initialization goes here.
    }

    change() {
        const skins =['girl', 'boy', 'girl-blue-cape', 'girl-spring-dress'].map(x=> `full-skins/${x}`);
        this.skinId = (this.skinId + 1) % skins.length;
        this.spine!.setSkin(skins[this.skinId]);
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
