// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { _decorator, Component, ParticleSystem2D, SpriteFrame } from 'cc';
const { ccclass, type } = _decorator;

@ccclass('ParticleSpriteChange')
export class ParticleSpriteChange extends Component {
    @type(ParticleSystem2D)
    particle: ParticleSystem2D | null = null;
    @type(SpriteFrame)
    arror: SpriteFrame | null = null;
    @type(SpriteFrame)
    add: SpriteFrame | null = null;

    changeCustom () {
        const ps = this.particle!;
        if (ps.spriteFrame !== this.arror) {
            ps.spriteFrame = this.arror;
        }
        else {
            ps.spriteFrame = this.add;
        }
    }
}
