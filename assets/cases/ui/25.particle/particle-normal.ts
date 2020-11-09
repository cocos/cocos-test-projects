// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
const { ccclass, type } = _decorator;

@ccclass('ParticleControl')
export class ParticleControl extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    @type(Prefab)
    spritePrefab: Prefab | null = null;
    private totalNum = 20;
    start () {
        this.schedule(this.addParticle, 1);
    }

    addParticle () {
        if (this.totalNum > 0) {
            var particle = instantiate(this.spritePrefab);
            particle!.parent = this.node;
            particle!.setPosition(Math.random() * 200, Math.random() * 200);
            this.totalNum--;
        }
    }
}
