
import { _decorator, Component, ParticleSystem2D, SpriteFrame } from 'cc';
const { ccclass, type } = _decorator;

@ccclass('ParticleSpriteChange')
export class ParticleSpriteChange extends Component {
    @type(ParticleSystem2D)
    public particle: ParticleSystem2D = null!;
    @type(SpriteFrame)
    public spError: SpriteFrame = null!;
    @type(SpriteFrame)
    public add: SpriteFrame = null!;

    changeCustom () {
        const ps = this.particle!;
        if (ps.spriteFrame !== this.spError) {
            ps.spriteFrame = this.spError;
        }
        else {
            ps.spriteFrame = this.add;
        }
    }
}
