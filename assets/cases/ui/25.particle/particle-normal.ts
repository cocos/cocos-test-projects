
import { _decorator, Component, Node, Prefab, instantiate, random } from 'cc';
const { ccclass, type } = _decorator;

@ccclass('ParticleControl')
export class ParticleControl extends Component {

    @type(Prefab)
    public spritePrefab: Prefab = null!;
    private totalNum = 20;
    start () {
        this.schedule(this.addParticle, 1);
    }

    addParticle () {
        if (this.totalNum > 0) {
            const particle = instantiate(this.spritePrefab);
            particle!.parent = this.node;
            particle!.setPosition(random() * 200, random() * 200);
            this.totalNum--;
        }
    }
}
