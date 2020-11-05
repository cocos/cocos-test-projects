// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { _decorator, Component, ParticleSystem2D } from 'cc';
const { ccclass, type } = _decorator;

@ccclass('ParticleCustomChange')
export class ParticleCustomChange extends Component {
    @type(ParticleSystem2D)
    particle: ParticleSystem2D | null = null;

    changeCustom () {
        this.particle!.custom = !this.particle!.custom;
    }
}
