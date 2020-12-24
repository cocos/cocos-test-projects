
import { _decorator, Component, ParticleSystem2D } from 'cc';
const { ccclass, type } = _decorator;

@ccclass('ParticleCustomChange')
export class ParticleCustomChange extends Component {
    @type(ParticleSystem2D)
    public particle: ParticleSystem2D = null!;

    changeCustom () {
        this.particle!.custom = !this.particle!.custom;
    }
}
